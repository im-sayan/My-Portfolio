// node_modules/ngx-bootstrap/utils/fesm2022/ngx-bootstrap-utils.mjs
var Trigger = class {
  constructor(open, close) {
    this.open = open;
    this.close = close || open;
  }
  isManual() {
    return this.open === "manual" || this.close === "manual";
  }
};
var DEFAULT_ALIASES = {
  hover: ["mouseover", "mouseout"],
  focus: ["focusin", "focusout"]
};
function parseTriggers(triggers, aliases = DEFAULT_ALIASES) {
  const trimmedTriggers = (triggers || "").trim();
  if (trimmedTriggers.length === 0) {
    return [];
  }
  const parsedTriggers = trimmedTriggers.split(/\s+/).map((trigger) => trigger.split(":")).map((triggerPair) => {
    const alias = aliases[triggerPair[0]] || triggerPair;
    return new Trigger(alias[0], alias[1]);
  });
  const manualTriggers = parsedTriggers.filter((triggerPair) => triggerPair.isManual());
  if (manualTriggers.length > 1) {
    throw new Error("Triggers parse error: only one manual trigger is allowed");
  }
  if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
    throw new Error("Triggers parse error: manual trigger can't be mixed with other triggers");
  }
  return parsedTriggers;
}
function listenToTriggersV2(renderer, options) {
  const parsedTriggers = parseTriggers(options.triggers);
  const target = options.target;
  if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
    return Function.prototype;
  }
  const listeners = [];
  const _registerHide = [];
  const registerHide = () => {
    _registerHide.forEach((fn) => listeners.push(fn()));
    _registerHide.length = 0;
  };
  parsedTriggers.forEach((trigger) => {
    const useToggle = trigger.open === trigger.close;
    const showFn = useToggle ? options.toggle : options.show;
    if (!useToggle && trigger.close && options.hide) {
      const triggerClose = trigger.close;
      const optionsHide = options.hide;
      const _hide = () => renderer.listen(target, triggerClose, optionsHide);
      _registerHide.push(_hide);
    }
    if (showFn) {
      listeners.push(renderer.listen(target, trigger.open, () => showFn(registerHide)));
    }
  });
  return () => {
    listeners.forEach((unsubscribeFn) => unsubscribeFn());
  };
}
function registerOutsideClick(renderer, options) {
  if (!options.outsideClick) {
    return Function.prototype;
  }
  return renderer.listen("document", "click", (event) => {
    if (options.target && options.target.contains(event.target)) {
      return;
    }
    if (options.targets && options.targets.some((target) => target.contains(event.target))) {
      return;
    }
    if (options.hide) {
      options.hide();
    }
  });
}
function registerEscClick(renderer, options) {
  if (!options.outsideEsc) {
    return Function.prototype;
  }
  return renderer.listen("document", "keyup.esc", (event) => {
    if (options.target && options.target.contains(event.target)) {
      return;
    }
    if (options.targets && options.targets.some((target) => target.contains(event.target))) {
      return;
    }
    if (options.hide) {
      options.hide();
    }
  });
}
var win = typeof window !== "undefined" && window || {};
var document = win.document;
var location = win.location;
var gc = win.gc ? () => win.gc() : () => null;
var performance = win.performance ? win.performance : null;
var Event = win.Event;
var MouseEvent = win.MouseEvent;
var KeyboardEvent = win.KeyboardEvent;
var EventTarget = win.EventTarget;
var History = win.History;
var Location = win.Location;
var EventListener = win.EventListener;
var BsVerions;
(function(BsVerions2) {
  BsVerions2["isBs4"] = "bs4";
  BsVerions2["isBs5"] = "bs5";
})(BsVerions || (BsVerions = {}));
var guessedVersion;
function _guessBsVersion() {
  const spanEl = win.document.createElement("span");
  spanEl.innerText = "testing bs version";
  spanEl.classList.add("d-none");
  spanEl.classList.add("pl-1");
  win.document.head.appendChild(spanEl);
  const checkPadding = win.getComputedStyle(spanEl).paddingLeft;
  if (checkPadding && parseFloat(checkPadding)) {
    win.document.head.removeChild(spanEl);
    return "bs4";
  }
  win.document.head.removeChild(spanEl);
  return "bs5";
}
function isBs4() {
  if (guessedVersion)
    return guessedVersion === "bs4";
  guessedVersion = _guessBsVersion();
  return guessedVersion === "bs4";
}
function isBs5() {
  if (guessedVersion)
    return guessedVersion === "bs5";
  guessedVersion = _guessBsVersion();
  return guessedVersion === "bs5";
}
function getBsVer() {
  return {
    isBs4: isBs4(),
    isBs5: isBs5()
  };
}
function currentBsVersion() {
  const bsVer = getBsVer();
  const resVersion = Object.keys(bsVer).find((key) => bsVer[key]);
  return BsVerions[resVersion];
}
var LinkedList = class {
  constructor() {
    this.length = 0;
    this.asArray = [];
  }
  get(position) {
    if (this.length === 0 || position < 0 || position >= this.length) {
      return void 0;
    }
    let current = this.head;
    for (let index = 0; index < position; index++) {
      current = current?.next;
    }
    return current?.value;
  }
  add(value, position = this.length) {
    if (position < 0 || position > this.length) {
      throw new Error("Position is out of the list");
    }
    const node = {
      value,
      next: void 0,
      previous: void 0
    };
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
      this.current = node;
    } else {
      if (position === 0 && this.head) {
        node.next = this.head;
        this.head.previous = node;
        this.head = node;
      } else if (position === this.length && this.tail) {
        this.tail.next = node;
        node.previous = this.tail;
        this.tail = node;
      } else {
        const currentPreviousNode = this.getNode(position - 1);
        const currentNextNode = currentPreviousNode?.next;
        if (currentPreviousNode && currentNextNode) {
          currentPreviousNode.next = node;
          currentNextNode.previous = node;
          node.previous = currentPreviousNode;
          node.next = currentNextNode;
        }
      }
    }
    this.length++;
    this.createInternalArrayRepresentation();
  }
  remove(position = 0) {
    if (this.length === 0 || position < 0 || position >= this.length) {
      throw new Error("Position is out of the list");
    }
    if (position === 0 && this.head) {
      this.head = this.head.next;
      if (this.head) {
        this.head.previous = void 0;
      } else {
        this.tail = void 0;
      }
    } else if (position === this.length - 1 && this.tail?.previous) {
      this.tail = this.tail.previous;
      this.tail.next = void 0;
    } else {
      const removedNode = this.getNode(position);
      if (removedNode?.next && removedNode.previous) {
        removedNode.next.previous = removedNode.previous;
        removedNode.previous.next = removedNode.next;
      }
    }
    this.length--;
    this.createInternalArrayRepresentation();
  }
  set(position, value) {
    if (this.length === 0 || position < 0 || position >= this.length) {
      throw new Error("Position is out of the list");
    }
    const node = this.getNode(position);
    if (node) {
      node.value = value;
      this.createInternalArrayRepresentation();
    }
  }
  toArray() {
    return this.asArray;
  }
  findAll(fn) {
    let current = this.head;
    const result = [];
    if (!current) {
      return result;
    }
    for (let index = 0; index < this.length; index++) {
      if (!current) {
        return result;
      }
      if (fn(current.value, index)) {
        result.push({ index, value: current.value });
      }
      current = current.next;
    }
    return result;
  }
  // Array methods overriding start
  push(...args) {
    args.forEach((arg) => {
      this.add(arg);
    });
    return this.length;
  }
  pop() {
    if (this.length === 0) {
      return void 0;
    }
    const last = this.tail;
    this.remove(this.length - 1);
    return last?.value;
  }
  unshift(...args) {
    args.reverse();
    args.forEach((arg) => {
      this.add(arg, 0);
    });
    return this.length;
  }
  shift() {
    if (this.length === 0) {
      return void 0;
    }
    const lastItem = this.head?.value;
    this.remove();
    return lastItem;
  }
  forEach(fn) {
    let current = this.head;
    for (let index = 0; index < this.length; index++) {
      if (!current) {
        return;
      }
      fn(current.value, index);
      current = current.next;
    }
  }
  indexOf(value) {
    let current = this.head;
    let position = -1;
    for (let index = 0; index < this.length; index++) {
      if (!current) {
        return position;
      }
      if (current.value === value) {
        position = index;
        break;
      }
      current = current.next;
    }
    return position;
  }
  some(fn) {
    let current = this.head;
    let result = false;
    while (current && !result) {
      if (fn(current.value)) {
        result = true;
        break;
      }
      current = current.next;
    }
    return result;
  }
  every(fn) {
    let current = this.head;
    let result = true;
    while (current && result) {
      if (!fn(current.value)) {
        result = false;
      }
      current = current.next;
    }
    return result;
  }
  toString() {
    return "[Linked List]";
  }
  find(fn) {
    let current = this.head;
    for (let index = 0; index < this.length; index++) {
      if (!current) {
        return;
      }
      if (fn(current.value, index)) {
        return current.value;
      }
      current = current.next;
    }
  }
  findIndex(fn) {
    let current = this.head;
    for (let index = 0; index < this.length; index++) {
      if (!current) {
        return -1;
      }
      if (fn(current.value, index)) {
        return index;
      }
      current = current.next;
    }
    return -1;
  }
  getNode(position) {
    if (this.length === 0 || position < 0 || position >= this.length) {
      throw new Error("Position is out of the list");
    }
    let current = this.head;
    for (let index = 0; index < position; index++) {
      current = current?.next;
    }
    return current;
  }
  createInternalArrayRepresentation() {
    const outArray = [];
    let current = this.head;
    while (current) {
      outArray.push(current.value);
      current = current.next;
    }
    this.asArray = outArray;
  }
};
var Utils = class {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static reflow(element) {
    /* @__PURE__ */ ((bs) => bs)(element.offsetHeight);
  }
  // source: https://github.com/jquery/jquery/blob/master/src/css/var/getStyles.js
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getStyles(elem) {
    let view = elem.ownerDocument.defaultView;
    if (!view || !view.opener) {
      view = win;
    }
    return view.getComputedStyle(elem);
  }
  static stackOverflowConfig() {
    const bsVer = currentBsVersion();
    return {
      crossorigin: "anonymous",
      integrity: bsVer === "bs5" ? "sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" : "sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2",
      cdnLink: bsVer === "bs5" ? "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" : "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
    };
  }
};
var _hideMsg = typeof console === "undefined" || !("warn" in console);

export {
  listenToTriggersV2,
  registerOutsideClick,
  registerEscClick,
  win,
  document,
  getBsVer,
  LinkedList,
  Utils
};
/*! Bundled license information:

ngx-bootstrap/utils/fesm2022/ngx-bootstrap-utils.mjs:
  (**
   * @license
   * Copyright Google Inc. All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *)
*/
//# sourceMappingURL=chunk-R45WLY5T.js.map
