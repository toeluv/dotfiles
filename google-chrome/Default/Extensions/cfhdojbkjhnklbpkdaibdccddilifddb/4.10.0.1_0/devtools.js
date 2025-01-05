/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/core/messaging/shared/emitter.ts
class MessageEmitter {
    constructor() {
        this.listeners = new Set();
    }
    addListener(listener) {
        this.listeners.add(listener);
    }
    removeListener(listener) {
        this.listeners.delete(listener);
    }
    dispatch(message, sender) {
        const results = [];
        for (const listener of this.listeners) {
            results.push(listener(message, sender));
        }
        return results;
    }
}

;// CONCATENATED MODULE: ./src/core/messaging/shared/messaging.ts
function getMessageResponse(responses) {
    for (const response of responses) {
        if (typeof response !== "undefined") {
            return response;
        }
    }
}
function isEventMessage(candidate) {
    return isMessage(candidate) && "action" in candidate && "args" in candidate;
}
function isMessage(candidate) {
    return (candidate !== null && typeof candidate === "object" && "type" in candidate);
}
function isListenMessage(candidate) {
    return isMessage(candidate) && "filter" in candidate;
}
function isPremiumActivateOptions(candidate) {
    return (candidate !== null && typeof candidate === "object" && "userId" in candidate);
}
function isPremiumSubscriptionsAddRemoveOptions(candidate) {
    return (candidate !== null &&
        typeof candidate === "object" &&
        "subscriptionType" in candidate);
}

;// CONCATENATED MODULE: ./src/core/messaging/front/messaging.ts

let port;
const connectListeners = new Set();
const disconnectListeners = new Set();
const messageListeners = new Set();
const messageEmitter = new MessageEmitter();
function addConnectListener(listener) {
    connectListeners.add(listener);
    listener();
}
function addDisconnectListener(listener) {
    disconnectListeners.add(listener);
}
function addMessageListener(listener) {
    messageListeners.add(listener);
}
const connect = () => {
    if (port) {
        return port;
    }
    try {
        port = browser.runtime.connect({ name: "ui" });
    }
    catch (ex) {
        port = null;
        disconnectListeners.forEach((listener) => {
            listener();
        });
        return port;
    }
    port.onMessage.addListener((message) => {
        onMessage(message);
    });
    port.onDisconnect.addListener(onDisconnect);
    connectListeners.forEach((listener) => {
        listener();
    });
    return port;
};
function listen({ type, filter, ...options }) {
    addConnectListener(() => {
        if (port) {
            port.postMessage({
                type: `${type}.listen`,
                filter,
                ...options
            });
        }
    });
}
function onDisconnect() {
    port = null;
    setTimeout(() => connect(), 100);
}
function onMessage(message) {
    if (!message.type.endsWith(".respond")) {
        return;
    }
    messageListeners.forEach((listener) => {
        listener(message);
    });
}
function removeDisconnectListener(listener) {
    disconnectListeners.delete(listener);
}
function start() {
    connect();
    if (typeof browser.devtools === "undefined") {
        browser.runtime.onMessage.addListener((message, sender) => {
            if (!isMessage(message)) {
                return;
            }
            const responses = messageEmitter.dispatch(message, sender);
            const response = getMessageResponse(responses);
            if (typeof response === "undefined") {
                return;
            }
            return Promise.resolve(response);
        });
    }
}
start();

;// CONCATENATED MODULE: ./src/core/messaging/front/category-app.ts


const platformToStore = new Map([
    ["chromium", "chrome"],
    ["edgehtml", "edge"],
    ["gecko", "firefox"]
]);
async function get(what) {
    const options = { what };
    return await send("app.get", options);
}
async function getInfo() {
    var _a;
    const [application, platform] = await Promise.all([
        get("application"),
        get("platform")
    ]);
    let store;
    if (application !== "edge" && application !== "opera") {
        store = (_a = platformToStore.get(platform)) !== null && _a !== void 0 ? _a : "chrome";
    }
    else {
        store = application;
    }
    return {
        application,
        manifestVersion: browser.runtime.getManifest().manifest_version,
        platform,
        store
    };
}
function category_app_listen(filter) {
    messaging.listen({ type: "app", filter });
}
async function category_app_open(what, parameters = {}) {
    const options = { what, ...parameters };
    await send("app.open", options);
}

;// CONCATENATED MODULE: ./src/core/messaging/front/category-filters.ts


async function category_filters_get() {
    return await send("filters.get");
}
function category_filters_listen(filter) {
    messaging.listen({ type: "filters", filter });
}

;// CONCATENATED MODULE: ./src/core/messaging/front/utils.ts
async function utils_send(sendType, options = {}) {
    const args = {
        ...options,
        type: sendType
    };
    return await browser.runtime.sendMessage(args);
}

;// CONCATENATED MODULE: ./src/core/messaging/front/category-prefs.ts


async function category_prefs_get(key) {
    const options = { key };
    return await utils_send("prefs.get", options);
}
function category_prefs_listen(filter) {
    listen({ type: "prefs", filter });
}

;// CONCATENATED MODULE: ./src/core/messaging/front/category-premium.ts


async function activate(userId) {
    const options = { userId };
    return await send("premium.activate", options);
}
async function add(subscriptionType) {
    const options = { subscriptionType };
    await send("premium.subscriptions.add", options);
}
async function category_premium_get() {
    return await send("premium.get");
}
async function getPremiumSubscriptionsState() {
    return await send("premium.subscriptions.getState");
}
function category_premium_listen(filter) {
    messaging.listen({ type: "premium", filter });
}
async function remove(subscriptionType) {
    const options = { subscriptionType };
    await send("premium.subscriptions.remove", options);
}

;// CONCATENATED MODULE: ./src/core/messaging/front/category-requests.ts

function category_requests_listen(filter, tabId) {
    messaging.listen({ type: "requests", filter, tabId });
}

;// CONCATENATED MODULE: ./src/core/messaging/front/category-stats.ts


async function getBlockedPerPage(tab) {
    const options = { tab };
    return await send("stats.getBlockedPerPage", options);
}
async function getBlockedTotal() {
    return await send("stats.getBlockedTotal");
}
function category_stats_listen(filter) {
    messaging.listen({ type: "stats", filter });
}

;// CONCATENATED MODULE: ./src/core/messaging/front/category-subscriptions.ts


async function category_subscriptions_add(url) {
    const options = { url };
    return await send("subscriptions.add", options);
}
async function category_subscriptions_get(options) {
    return await send("subscriptions.get", options !== null && options !== void 0 ? options : {});
}
async function getInitIssues() {
    return await send("subscriptions.getInitIssues");
}
async function getRecommendations() {
    return await send("subscriptions.getRecommendations");
}
function category_subscriptions_listen(filter) {
    messaging.listen({ type: "subscriptions", filter });
}
async function category_subscriptions_remove(url) {
    const options = { url };
    await send("subscriptions.remove", options);
}

;// CONCATENATED MODULE: ./src/core/messaging/front/index.ts



















;// CONCATENATED MODULE: ./src/devtools/ui/devtools.ts

let panelWindow = null;
function forwardSearchAction(eventName, queryString) {
    if (!panelWindow) {
        return;
    }
    panelWindow.postMessage({ type: eventName, queryString }, "*");
}
function setPanelWindow(window) {
    panelWindow = window;
}
function unsetPanelWindow() {
    panelWindow = null;
}
async function devtools_start() {
    const isEnabled = await category_prefs_get("show_devtools_panel");
    if (!isEnabled) {
        return;
    }
    const panel = await browser.devtools.panels.create("Adblock Plus", "icons/abp-32.png", "devtools-panel.html");
    panel.onShown.addListener(setPanelWindow);
    panel.onHidden.addListener(unsetPanelWindow);
    if (panel.onSearch) {
        panel.onSearch.addListener(forwardSearchAction);
    }
}
void devtools_start().catch(console.error);

;// CONCATENATED MODULE: ./src/devtools/ui/index.ts



/******/ })()
;
//# sourceMappingURL=devtools.js.map