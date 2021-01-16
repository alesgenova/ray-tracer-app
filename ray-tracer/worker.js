'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var wasm;
var heap = new Array(32).fill(undefined);
heap.push(undefined, null, true, false);

function getObject(idx) {
  return heap[idx];
}

var heap_next = heap.length;

function dropObject(idx) {
  if (idx < 36) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  var ret = getObject(idx);
  dropObject(idx);
  return ret;
}

var cachedTextDecoder = new TextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true
});
cachedTextDecoder.decode();
var cachegetUint8Memory0 = null;

function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }

  return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function _assertClass(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error("expected instance of ".concat(klass.name));
  }

  return instance.ptr;
}

var cachegetFloat64Memory0 = null;

function getFloat64Memory0() {
  if (cachegetFloat64Memory0 === null || cachegetFloat64Memory0.buffer !== wasm.memory.buffer) {
    cachegetFloat64Memory0 = new Float64Array(wasm.memory.buffer);
  }

  return cachegetFloat64Memory0;
}

var WASM_VECTOR_LEN = 0;

function passArrayF64ToWasm0(arg, malloc) {
  var ptr = malloc(arg.length * 8);
  getFloat64Memory0().set(arg, ptr / 8);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  var idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}

function getArrayU8FromWasm0(ptr, len) {
  return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
*/


var Actor = /*#__PURE__*/function () {
  function Actor() {
    _classCallCheck(this, Actor);
  }

  _createClass(Actor, [{
    key: "free",
    value: function free() {
      var ptr = this.ptr;
      this.ptr = 0;

      wasm.__wbg_actor_free(ptr);
    }
    /**
    * @param {Hitable} hitable
    * @param {Material} material
    * @returns {Actor}
    */

  }], [{
    key: "__wrap",
    value: function __wrap(ptr) {
      var obj = Object.create(Actor.prototype);
      obj.ptr = ptr;
      return obj;
    }
  }, {
    key: "new",
    value: function _new(hitable, material) {
      _assertClass(hitable, Hitable);

      var ptr0 = hitable.ptr;
      hitable.ptr = 0;

      _assertClass(material, Material);

      var ptr1 = material.ptr;
      material.ptr = 0;
      var ret = wasm.actor_new(ptr0, ptr1);
      return Actor.__wrap(ret);
    }
  }]);

  return Actor;
}();
/**
*/


var Camera = /*#__PURE__*/function () {
  function Camera() {
    _classCallCheck(this, Camera);
  }

  _createClass(Camera, [{
    key: "free",
    value: function free() {
      var ptr = this.ptr;
      this.ptr = 0;

      wasm.__wbg_camera_free(ptr);
    }
    /**
    * @returns {Camera}
    */

  }, {
    key: "set_aspect",

    /**
    * @param {number} aspect
    */
    value: function set_aspect(aspect) {
      wasm.camera_set_aspect(this.ptr, aspect);
    }
    /**
    * @param {number} fov
    */

  }, {
    key: "set_fov",
    value: function set_fov(fov) {
      wasm.camera_set_fov(this.ptr, fov);
    }
    /**
    * @param {Float64Array} position
    */

  }, {
    key: "set_position",
    value: function set_position(position) {
      var ptr0 = passArrayF64ToWasm0(position, wasm.__wbindgen_malloc);
      var len0 = WASM_VECTOR_LEN;
      wasm.camera_set_position(this.ptr, ptr0, len0);
    }
    /**
    * @param {Float64Array} direction
    */

  }, {
    key: "set_direction",
    value: function set_direction(direction) {
      var ptr0 = passArrayF64ToWasm0(direction, wasm.__wbindgen_malloc);
      var len0 = WASM_VECTOR_LEN;
      wasm.camera_set_direction(this.ptr, ptr0, len0);
    }
    /**
    * @param {Float64Array} lookat
    */

  }, {
    key: "set_lookat",
    value: function set_lookat(lookat) {
      var ptr0 = passArrayF64ToWasm0(lookat, wasm.__wbindgen_malloc);
      var len0 = WASM_VECTOR_LEN;
      wasm.camera_set_lookat(this.ptr, ptr0, len0);
    }
    /**
    * @param {Float64Array} up
    */

  }, {
    key: "set_up",
    value: function set_up(up) {
      var ptr0 = passArrayF64ToWasm0(up, wasm.__wbindgen_malloc);
      var len0 = WASM_VECTOR_LEN;
      wasm.camera_set_up(this.ptr, ptr0, len0);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(ptr) {
      var obj = Object.create(Camera.prototype);
      obj.ptr = ptr;
      return obj;
    }
  }, {
    key: "new",
    value: function _new() {
      var ret = wasm.camera_new();
      return Camera.__wrap(ret);
    }
  }]);

  return Camera;
}();
/**
*/


var Hitable = /*#__PURE__*/function () {
  function Hitable() {
    _classCallCheck(this, Hitable);
  }

  _createClass(Hitable, [{
    key: "free",
    value: function free() {
      var ptr = this.ptr;
      this.ptr = 0;

      wasm.__wbg_hitable_free(ptr);
    }
    /**
    * @param {number} radius
    * @returns {Hitable}
    */

  }], [{
    key: "__wrap",
    value: function __wrap(ptr) {
      var obj = Object.create(Hitable.prototype);
      obj.ptr = ptr;
      return obj;
    }
  }, {
    key: "sphere",
    value: function sphere(radius) {
      var ret = wasm.hitable_sphere(radius);
      return Hitable.__wrap(ret);
    }
    /**
    * @param {number} length
    * @param {number} width
    * @param {number} height
    * @returns {Hitable}
    */

  }, {
    key: "cube",
    value: function cube(length, width, height) {
      var ret = wasm.hitable_cube(length, width, height);
      return Hitable.__wrap(ret);
    }
    /**
    * @param {number} width
    * @param {number} width_axis
    * @param {number} height
    * @param {number} height_axis
    * @returns {Hitable}
    */

  }, {
    key: "rectangle",
    value: function rectangle(width, width_axis, height, height_axis) {
      var ret = wasm.hitable_rectangle(width, width_axis, height, height_axis);
      return Hitable.__wrap(ret);
    }
    /**
    * @param {Hitable} hitable
    * @param {Float64Array} offset
    * @returns {Hitable}
    */

  }, {
    key: "translation",
    value: function translation(hitable, offset) {
      _assertClass(hitable, Hitable);

      var ptr0 = hitable.ptr;
      hitable.ptr = 0;
      var ptr1 = passArrayF64ToWasm0(offset, wasm.__wbindgen_malloc);
      var len1 = WASM_VECTOR_LEN;
      var ret = wasm.hitable_translation(ptr0, ptr1, len1);
      return Hitable.__wrap(ret);
    }
  }]);

  return Hitable;
}();
/**
*/


var Material = /*#__PURE__*/function () {
  function Material() {
    _classCallCheck(this, Material);
  }

  _createClass(Material, [{
    key: "free",
    value: function free() {
      var ptr = this.ptr;
      this.ptr = 0;

      wasm.__wbg_material_free(ptr);
    }
    /**
    * @param {Texture} texture
    * @returns {Material}
    */

  }], [{
    key: "__wrap",
    value: function __wrap(ptr) {
      var obj = Object.create(Material.prototype);
      obj.ptr = ptr;
      return obj;
    }
  }, {
    key: "plain",
    value: function plain(texture) {
      _assertClass(texture, Texture);

      var ptr0 = texture.ptr;
      texture.ptr = 0;
      var ret = wasm.material_plain(ptr0);
      return Material.__wrap(ret);
    }
    /**
    * @param {Texture} texture
    * @param {number} dimming
    * @returns {Material}
    */

  }, {
    key: "lambertian",
    value: function lambertian(texture, dimming) {
      _assertClass(texture, Texture);

      var ptr0 = texture.ptr;
      texture.ptr = 0;
      var ret = wasm.material_lambertian(ptr0, dimming);
      return Material.__wrap(ret);
    }
    /**
    * @param {Texture} texture
    * @param {number} fuzziness
    * @returns {Material}
    */

  }, {
    key: "metal",
    value: function metal(texture, fuzziness) {
      _assertClass(texture, Texture);

      var ptr0 = texture.ptr;
      texture.ptr = 0;
      var ret = wasm.material_metal(ptr0, fuzziness);
      return Material.__wrap(ret);
    }
    /**
    * @param {Texture} texture
    * @param {number} n
    * @returns {Material}
    */

  }, {
    key: "dielectric",
    value: function dielectric(texture, n) {
      _assertClass(texture, Texture);

      var ptr0 = texture.ptr;
      texture.ptr = 0;
      var ret = wasm.material_dielectric(ptr0, n);
      return Material.__wrap(ret);
    }
  }]);

  return Material;
}();
/**
*/


var Renderer = /*#__PURE__*/function () {
  function Renderer() {
    _classCallCheck(this, Renderer);
  }

  _createClass(Renderer, [{
    key: "free",
    value: function free() {
      var ptr = this.ptr;
      this.ptr = 0;

      wasm.__wbg_renderer_free(ptr);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @param {number} sampling
    * @param {number} reflections
    * @param {boolean} antialiasing
    * @returns {Renderer}
    */

  }, {
    key: "render",

    /**
    * @param {Scene} scene
    * @param {Camera} camera
    * @param {Float64Array} image
    */
    value: function render(scene, camera, image) {
      try {
        _assertClass(scene, Scene);

        _assertClass(camera, Camera);

        var ptr0 = passArrayF64ToWasm0(image, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.renderer_render(this.ptr, scene.ptr, camera.ptr, ptr0, len0);
      } finally {
        image.set(getFloat64Memory0().subarray(ptr0 / 8, ptr0 / 8 + len0));

        wasm.__wbindgen_free(ptr0, len0 * 8);
      }
    }
    /**
    * @param {number} i
    * @param {number} j
    * @param {Scene} scene
    * @param {Camera} camera
    * @param {Float64Array} color
    */

  }, {
    key: "render_pixel",
    value: function render_pixel(i, j, scene, camera, color) {
      try {
        _assertClass(scene, Scene);

        _assertClass(camera, Camera);

        var ptr0 = passArrayF64ToWasm0(color, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.renderer_render_pixel(this.ptr, i, j, scene.ptr, camera.ptr, ptr0, len0);
      } finally {
        color.set(getFloat64Memory0().subarray(ptr0 / 8, ptr0 / 8 + len0));

        wasm.__wbindgen_free(ptr0, len0 * 8);
      }
    }
    /**
    * @param {number} start
    * @param {number} stop
    * @param {Scene} scene
    * @param {Camera} camera
    * @param {Float64Array} color
    */

  }, {
    key: "render_chunk",
    value: function render_chunk(start, stop, scene, camera, color) {
      try {
        _assertClass(scene, Scene);

        _assertClass(camera, Camera);

        var ptr0 = passArrayF64ToWasm0(color, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.renderer_render_chunk(this.ptr, start, stop, scene.ptr, camera.ptr, ptr0, len0);
      } finally {
        color.set(getFloat64Memory0().subarray(ptr0 / 8, ptr0 / 8 + len0));

        wasm.__wbindgen_free(ptr0, len0 * 8);
      }
    }
  }], [{
    key: "__wrap",
    value: function __wrap(ptr) {
      var obj = Object.create(Renderer.prototype);
      obj.ptr = ptr;
      return obj;
    }
  }, {
    key: "new",
    value: function _new(width, height, sampling, reflections, antialiasing) {
      var ret = wasm.renderer_new(width, height, sampling, reflections, antialiasing);
      return Renderer.__wrap(ret);
    }
  }]);

  return Renderer;
}();
/**
*/


var Scene = /*#__PURE__*/function () {
  function Scene() {
    _classCallCheck(this, Scene);
  }

  _createClass(Scene, [{
    key: "free",
    value: function free() {
      var ptr = this.ptr;
      this.ptr = 0;

      wasm.__wbg_scene_free(ptr);
    }
    /**
    * @returns {Scene}
    */

  }, {
    key: "add_actor",

    /**
    * @param {Actor} actor
    */
    value: function add_actor(actor) {
      _assertClass(actor, Actor);

      var ptr0 = actor.ptr;
      actor.ptr = 0;
      wasm.scene_add_actor(this.ptr, ptr0);
    }
    /**
    * @param {Float64Array} color
    */

  }, {
    key: "set_background",
    value: function set_background(color) {
      var ptr0 = passArrayF64ToWasm0(color, wasm.__wbindgen_malloc);
      var len0 = WASM_VECTOR_LEN;
      wasm.scene_set_background(this.ptr, ptr0, len0);
    }
    /**
    * @param {number} tree_type
    */

  }, {
    key: "set_tree_type",
    value: function set_tree_type(tree_type) {
      wasm.scene_set_tree_type(this.ptr, tree_type);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(ptr) {
      var obj = Object.create(Scene.prototype);
      obj.ptr = ptr;
      return obj;
    }
  }, {
    key: "new",
    value: function _new() {
      var ret = wasm.scene_new();
      return Scene.__wrap(ret);
    }
  }]);

  return Scene;
}();
/**
*/


var Texture = /*#__PURE__*/function () {
  function Texture() {
    _classCallCheck(this, Texture);
  }

  _createClass(Texture, [{
    key: "free",
    value: function free() {
      var ptr = this.ptr;
      this.ptr = 0;

      wasm.__wbg_texture_free(ptr);
    }
    /**
    * @param {Float64Array} color
    * @returns {Texture}
    */

  }], [{
    key: "__wrap",
    value: function __wrap(ptr) {
      var obj = Object.create(Texture.prototype);
      obj.ptr = ptr;
      return obj;
    }
  }, {
    key: "uniform",
    value: function uniform(color) {
      var ptr0 = passArrayF64ToWasm0(color, wasm.__wbindgen_malloc);
      var len0 = WASM_VECTOR_LEN;
      var ret = wasm.texture_uniform(ptr0, len0);
      return Texture.__wrap(ret);
    }
    /**
    * @param {Texture} texture0
    * @param {Texture} texture1
    * @returns {Texture}
    */

  }, {
    key: "checker",
    value: function checker(texture0, texture1) {
      _assertClass(texture0, Texture);

      var ptr0 = texture0.ptr;
      texture0.ptr = 0;

      _assertClass(texture1, Texture);

      var ptr1 = texture1.ptr;
      texture1.ptr = 0;
      var ret = wasm.texture_checker(ptr0, ptr1);
      return Texture.__wrap(ret);
    }
  }]);

  return Texture;
}();

function load(_x, _x2) {
  return _load.apply(this, arguments);
}

function _load() {
  _load = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(module, imports) {
    var bytes, instance;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(typeof Response === 'function' && module instanceof Response)) {
              _context.next = 23;
              break;
            }

            if (!(typeof WebAssembly.instantiateStreaming === 'function')) {
              _context.next = 15;
              break;
            }

            _context.prev = 2;
            _context.next = 5;
            return WebAssembly.instantiateStreaming(module, imports);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);

            if (!(module.headers.get('Content-Type') != 'application/wasm')) {
              _context.next = 14;
              break;
            }

            console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", _context.t0);
            _context.next = 15;
            break;

          case 14:
            throw _context.t0;

          case 15:
            _context.next = 17;
            return module.arrayBuffer();

          case 17:
            bytes = _context.sent;
            _context.next = 20;
            return WebAssembly.instantiate(bytes, imports);

          case 20:
            return _context.abrupt("return", _context.sent);

          case 23:
            _context.next = 25;
            return WebAssembly.instantiate(module, imports);

          case 25:
            instance = _context.sent;

            if (!(instance instanceof WebAssembly.Instance)) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("return", {
              instance: instance,
              module: module
            });

          case 30:
            return _context.abrupt("return", instance);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 8]]);
  }));
  return _load.apply(this, arguments);
}

function init(_x3) {
  return _init.apply(this, arguments);
}

function _init() {
  _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(input) {
    var imports, _yield$load, instance, module;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (typeof input === 'undefined') {
              input = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : document.currentScript && document.currentScript.src || new URL('worker.js', document.baseURI).href).replace(/\.js$/, '_bg.wasm');
            }

            imports = {};
            imports.wbg = {};

            imports.wbg.__wbindgen_object_drop_ref = function (arg0) {
              takeObject(arg0);
            };

            imports.wbg.__wbg_new_3a746f2619705add = function (arg0, arg1) {
              var ret = new Function(getStringFromWasm0(arg0, arg1));
              return addHeapObject(ret);
            };

            imports.wbg.__wbg_call_f54d3a6dadb199ca = function (arg0, arg1) {
              var ret = getObject(arg0).call(getObject(arg1));
              return addHeapObject(ret);
            };

            imports.wbg.__wbindgen_jsval_eq = function (arg0, arg1) {
              var ret = getObject(arg0) === getObject(arg1);
              return ret;
            };

            imports.wbg.__wbg_self_ac379e780a0d8b94 = function (arg0) {
              var ret = getObject(arg0).self;
              return addHeapObject(ret);
            };

            imports.wbg.__wbg_crypto_1e4302b85d4f64a2 = function (arg0) {
              var ret = getObject(arg0).crypto;
              return addHeapObject(ret);
            };

            imports.wbg.__wbindgen_is_undefined = function (arg0) {
              var ret = getObject(arg0) === undefined;
              return ret;
            };

            imports.wbg.__wbg_getRandomValues_1b4ba144162a5c9e = function (arg0) {
              var ret = getObject(arg0).getRandomValues;
              return addHeapObject(ret);
            };

            imports.wbg.__wbg_require_6461b1e9a0d7c34a = function (arg0, arg1) {
              var ret = require(getStringFromWasm0(arg0, arg1));

              return addHeapObject(ret);
            };

            imports.wbg.__wbg_getRandomValues_1ef11e888e5228e9 = function (arg0, arg1, arg2) {
              getObject(arg0).getRandomValues(getArrayU8FromWasm0(arg1, arg2));
            };

            imports.wbg.__wbg_randomFillSync_1b52c8482374c55b = function (arg0, arg1, arg2) {
              getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
            };

            imports.wbg.__wbindgen_throw = function (arg0, arg1) {
              throw new Error(getStringFromWasm0(arg0, arg1));
            };

            if (typeof input === 'string' || typeof Request === 'function' && input instanceof Request || typeof URL === 'function' && input instanceof URL) {
              input = fetch(input);
            }

            _context2.t0 = load;
            _context2.next = 19;
            return input;

          case 19:
            _context2.t1 = _context2.sent;
            _context2.t2 = imports;
            _context2.next = 23;
            return (0, _context2.t0)(_context2.t1, _context2.t2);

          case 23:
            _yield$load = _context2.sent;
            instance = _yield$load.instance;
            module = _yield$load.module;
            wasm = instance.exports;
            init.__wbindgen_wasm_module = module;
            return _context2.abrupt("return", wasm);

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _init.apply(this, arguments);
}

function createUniqueIdFn() {
  var __id = 0;
  return function () {
    var id = __id;
    __id += 1;
    return id;
  };
}

var Emitter = /*#__PURE__*/function () {
  function Emitter() {
    _classCallCheck(this, Emitter);

    this.listeners = {};
  }

  _createClass(Emitter, [{
    key: "addEventListener",
    value: function addEventListener(eventName, listener) {
      var listeners = this.listeners[eventName];

      if (!listeners) {
        listeners = new Set();
        this.listeners[eventName] = listeners;
      }

      listeners.add(listener);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(eventName, listener) {
      var listeners = this.listeners[eventName];

      if (!listeners) {
        return;
      }

      listeners.delete(listener);
    }
  }, {
    key: "once",
    value: function once(eventName) {
      var _this = this;

      return new Promise(function (resolve) {
        var listener = function listener(data) {
          _this.removeEventListener(eventName, listener);

          resolve(data);
        };

        _this.addEventListener(eventName, listener);
      });
    }
  }, {
    key: "emit",
    value: function emit(eventName, data) {
      var listeners = this.listeners[eventName];

      if (!listeners) {
        return;
      }

      listeners.forEach(function (listener) {
        listener(data);
      });
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners() {
      Object.values(this.listeners).forEach(function (listeners) {
        if (listeners) {
          listeners.clear();
        }
      });
    }
  }]);

  return Emitter;
}();

var MARKER = '@post-me';
var MessageType;

(function (MessageType) {
  MessageType["HandshakeRequest"] = "handshake-request";
  MessageType["HandshakeResponse"] = "handshake-response";
  MessageType["Call"] = "call";
  MessageType["Response"] = "response";
  MessageType["Error"] = "error";
  MessageType["Event"] = "event";
})(MessageType || (MessageType = {}));

function createHandshakeResponseMessage(sessionId) {
  return {
    type: MARKER,
    action: MessageType.HandshakeResponse,
    sessionId: sessionId
  };
}

function createCallMessage(sessionId, requestId, methodName) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  return {
    type: MARKER,
    action: MessageType.Call,
    sessionId: sessionId,
    requestId: requestId,
    methodName: methodName,
    args: args
  };
}

function createResponsMessage(sessionId, requestId, result, error) {
  var message = {
    type: MARKER,
    action: MessageType.Response,
    sessionId: sessionId,
    requestId: requestId
  };

  if (result !== undefined) {
    message.result = result;
  }

  if (error !== undefined) {
    message.error = error;
  }

  return message;
}

function createEventMessage(sessionId, eventName, payload) {
  return {
    type: MARKER,
    action: MessageType.Event,
    sessionId: sessionId,
    eventName: eventName,
    payload: payload
  };
} // Type Guards


function isMessage(m) {
  return m.type === MARKER;
}

function isHandshakeRequestMessage(m) {
  return isMessage(m) && m.action === MessageType.HandshakeRequest;
}

function isCallMessage(m) {
  return isMessage(m) && m.action === MessageType.Call;
}

function isResponseMessage(m) {
  return isMessage(m) && m.action === MessageType.Response;
}

function isEventMessage(m) {
  return isMessage(m) && m.action === MessageType.Event;
}

var Dispatcher = /*#__PURE__*/function (_Emitter) {
  _inherits(Dispatcher, _Emitter);

  var _super = _createSuper(Dispatcher);

  function Dispatcher(messenger, sessionId) {
    var _this2;

    _classCallCheck(this, Dispatcher);

    _this2 = _super.call(this);
    _this2.uniqueId = createUniqueIdFn();
    _this2.messenger = messenger;
    _this2.sessionId = sessionId;
    _this2.removeMessengerListener = _this2.messenger.addMessageListener(_this2.messengerListener.bind(_assertThisInitialized(_this2)));
    return _this2;
  }

  _createClass(Dispatcher, [{
    key: "messengerListener",
    value: function messengerListener(event) {
      var data = event.data;

      if (!isMessage(data)) {
        return;
      }

      if (this.sessionId !== data.sessionId) {
        return;
      }

      if (isCallMessage(data)) {
        this.emit(MessageType.Call, data);
      } else if (isResponseMessage(data)) {
        this.emit(data.requestId, data);
      } else if (isEventMessage(data)) {
        this.emit(MessageType.Event, data);
      }
    }
  }, {
    key: "callOnRemote",
    value: function callOnRemote(methodName) {
      var requestId = this.uniqueId();

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var message = createCallMessage.apply(void 0, [this.sessionId, requestId, methodName].concat(args));
      this.messenger.postMessage(message);
      return requestId;
    }
  }, {
    key: "respondToRemote",
    value: function respondToRemote(requestId, value, error) {
      var message = createResponsMessage(this.sessionId, requestId, value, error);
      this.messenger.postMessage(message);
    }
  }, {
    key: "emitToRemote",
    value: function emitToRemote(eventName, payload) {
      var message = createEventMessage(this.sessionId, eventName, payload);
      this.messenger.postMessage(message);
    }
  }, {
    key: "close",
    value: function close() {
      this.removeMessengerListener();
      this.removeAllListeners();
    }
  }]);

  return Dispatcher;
}(Emitter);

var ChildHandshakeDispatcher = /*#__PURE__*/function (_Emitter2) {
  _inherits(ChildHandshakeDispatcher, _Emitter2);

  var _super2 = _createSuper(ChildHandshakeDispatcher);

  function ChildHandshakeDispatcher(messenger) {
    var _this3;

    _classCallCheck(this, ChildHandshakeDispatcher);

    _this3 = _super2.call(this);
    _this3.messenger = messenger;
    _this3.removeMessengerListener = _this3.messenger.addMessageListener(_this3.messengerListener.bind(_assertThisInitialized(_this3)));
    return _this3;
  }

  _createClass(ChildHandshakeDispatcher, [{
    key: "messengerListener",
    value: function messengerListener(event) {
      var data = event.data;

      if (isHandshakeRequestMessage(data)) {
        this.emit(MessageType.HandshakeRequest, data);
      }
    }
  }, {
    key: "acceptHandshake",
    value: function acceptHandshake(sessionId) {
      var message = createHandshakeResponseMessage(sessionId);
      this.messenger.postMessage(message);
    }
  }, {
    key: "close",
    value: function close() {
      this.removeMessengerListener();
      this.removeAllListeners();
    }
  }]);

  return ChildHandshakeDispatcher;
}(Emitter);

var ConcreteRemoteHandle = /*#__PURE__*/function (_Emitter3) {
  _inherits(ConcreteRemoteHandle, _Emitter3);

  var _super3 = _createSuper(ConcreteRemoteHandle);

  function ConcreteRemoteHandle(callFn) {
    var _this4;

    _classCallCheck(this, ConcreteRemoteHandle);

    _this4 = _super3.call(this);
    _this4.call = callFn;
    return _this4;
  }

  return ConcreteRemoteHandle;
}(Emitter);

var ConcreteLocalHandle = function ConcreteLocalHandle(emitFn) {
  _classCallCheck(this, ConcreteLocalHandle);

  this.emit = emitFn;
};

var ConcreteConnection = /*#__PURE__*/function () {
  function ConcreteConnection(dispatcher, localMethods) {
    _classCallCheck(this, ConcreteConnection);

    this.dispatcher = dispatcher;
    this.methods = localMethods;
    this._remoteHandle = new ConcreteRemoteHandle(this.callRemoteMethod.bind(this));
    this._localHandle = new ConcreteLocalHandle(this.dispatcher.emitToRemote.bind(this.dispatcher));
    this.dispatcher.addEventListener(MessageType.Call, this.handleCall.bind(this));
    this.dispatcher.addEventListener(MessageType.Event, this.handleEvent.bind(this));
  }

  _createClass(ConcreteConnection, [{
    key: "close",
    value: function close() {
      this.dispatcher.close();

      this._remoteHandle['removeAllListeners']();
    }
  }, {
    key: "localHandle",
    value: function localHandle() {
      return this._localHandle;
    }
  }, {
    key: "remoteHandle",
    value: function remoteHandle() {
      return this._remoteHandle;
    }
  }, {
    key: "handleCall",
    value: function handleCall(data) {
      var _this5 = this;

      var requestId = data.requestId,
          methodName = data.methodName,
          args = data.args;
      var callMethod = new Promise(function (resolve, reject) {
        var method = _this5.methods[methodName];

        if (typeof method !== 'function') {
          reject(new Error("The method \"".concat(methodName, "\" has not been implemented.")));
          return;
        }

        Promise.resolve(method.apply(void 0, _toConsumableArray(args))).then(resolve).catch(reject);
      });
      callMethod.then(function (value) {
        _this5.dispatcher.respondToRemote(requestId, value);
      }).catch(function (error) {
        _this5.dispatcher.respondToRemote(requestId, undefined, error);
      });
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(data) {
      var eventName = data.eventName,
          payload = data.payload;

      this._remoteHandle['emit'](eventName, payload);
    }
  }, {
    key: "callRemoteMethod",
    value: function callRemoteMethod(methodName) {
      var _this6 = this;

      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      return new Promise(function (resolve, reject) {
        var _this6$dispatcher;

        var responseEvent = (_this6$dispatcher = _this6.dispatcher).callOnRemote.apply(_this6$dispatcher, [methodName].concat(args));

        _this6.dispatcher.once(responseEvent).then(function (response) {
          var result = response.result,
              error = response.error;

          if (error !== undefined) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    }
  }]);

  return ConcreteConnection;
}();

function ChildHandshake(messenger) {
  var localMethods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    var handshakeDispatcher = new ChildHandshakeDispatcher(messenger);
    handshakeDispatcher.once(MessageType.HandshakeRequest).then(function (response) {
      var sessionId = response.sessionId;
      handshakeDispatcher.acceptHandshake(sessionId);
      handshakeDispatcher.close();
      var dispatcher = new Dispatcher(messenger, sessionId);
      var connection = new ConcreteConnection(dispatcher, localMethods);
      resolve(connection);
    });
  });
}

var WorkerMessenger = function WorkerMessenger(_ref) {
  var worker = _ref.worker;

  _classCallCheck(this, WorkerMessenger);

  this.postMessage = function (message) {
    worker.postMessage(message);
  };

  this.addMessageListener = function (listener) {
    var outerListener = function outerListener(event) {
      listener(event);
    };

    worker.addEventListener('message', outerListener);

    var removeListener = function removeListener() {
      worker.removeEventListener('message', outerListener);
    };

    return removeListener;
  };
};
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var runtime = function (exports) {
  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined$1,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined$1;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
(typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" ? module.exports : {});

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

function makeRng(_seed) {
  var seed = _seed % 2147483647;
  if (seed <= 0) seed += 2147483646;
  return function () {
    seed = seed * 16807 % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function randomScene(aspect, seed) {
  var rng = makeRng(seed);
  var scene = Scene.new(); // scene.set_background([0.5, 0.7, 0.9]);

  scene.set_background([0.25, 0.35, 0.45]);
  var N_SPHERES_X = 20;
  var N_SPHERES_Y = N_SPHERES_X;
  var MIN_X = -25.0;
  var MAX_X = 25.0;
  var MIN_Y = MIN_X;
  var MAX_Y = MAX_X;
  var MIN_RADIUS = 0.2;
  var MAX_RADIUS = 0.4;
  var SPHERE_PROBABILITY = 0.66666666;
  var LAMBERTIAN_PROBABILITY = 0.3333;
  var METAL_PROBABILITY = 0.3333; // DIELECTRIC_PROBABILITY is 1 - LAMBERTIAN_PROBABILITY - METAL_PROBABILITY

  var MIN_FUZZINESS = 0.0;
  var MAX_FUZZINESS = 0.2;
  var MIN_REFRACTIVE = 1.2;
  var MAX_REFRACTIVE = 2.4;

  for (var i = 0; i < N_SPHERES_X; ++i) {
    for (var j = 0; j < N_SPHERES_Y; ++j) {
      var radius_1 = MIN_RADIUS + (MAX_RADIUS - MIN_RADIUS) * rng();
      var x = i + rng() * (1.0 - radius_1);
      x = MIN_X + (MAX_X - MIN_X) * x / N_SPHERES_X;
      var y = j + rng() * (1.0 - radius_1);
      y = MIN_Y + (MAX_Y - MIN_Y) * y / N_SPHERES_Y;
      var hitableRand = rng();
      var hitable = void 0;

      if (hitableRand < SPHERE_PROBABILITY) {
        hitable = Hitable.sphere(radius_1);
        hitable = Hitable.translation(hitable, [x, y, radius_1]);
      } else {
        var l = radius_1 * 2.0 * 0.75;
        hitable = Hitable.cube(l, l, l);
        hitable = Hitable.translation(hitable, [x, y, radius_1 * 0.75]);
      }

      var color = [rng(), rng(), rng()];
      var texture = Texture.uniform(color);
      var materialRand = rng();
      var material = void 0;

      if (materialRand < LAMBERTIAN_PROBABILITY) {
        material = Material.lambertian(texture, 0.65);
      } else if (materialRand < METAL_PROBABILITY) {
        var fuzziness = MIN_FUZZINESS + (MAX_FUZZINESS - MIN_FUZZINESS) * rng();
        material = Material.metal(texture, fuzziness);
      } else {
        var n = MIN_REFRACTIVE + (MAX_REFRACTIVE - MIN_REFRACTIVE) * rng();
        material = Material.dielectric(texture, n);
      }

      var actor = Actor.new(hitable, material);
      scene.add_actor(actor);
    }
  }

  var radius = 2.0;
  {
    var hitable = Hitable.sphere(radius);
    hitable = Hitable.translation(hitable, [0.0, 0.0, radius]);
    var color = new Float64Array([0.85, 1.0, 0.85]);
    var texture = Texture.uniform(color);
    var material = Material.dielectric(texture, 2.4);
    var actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  }
  {
    var hitable = Hitable.sphere(radius);
    hitable = Hitable.translation(hitable, [0.0, -2.1 * radius, radius]);
    var color = new Float64Array([0.9, 0.9, 0.9]);
    var texture = Texture.uniform(color);
    var material = Material.metal(texture, 0.00001);
    var actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  }
  {
    var hitable = Hitable.sphere(radius);
    hitable = Hitable.translation(hitable, [0.0, 2.1 * radius, radius]);
    var color = new Float64Array([1.0, 0.25, 0.25]);
    var texture = Texture.uniform(color);
    var material = Material.metal(texture, 0.05);
    var actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  } // Floor

  {
    var radius_2 = 4000.0;
    var hitable = Hitable.sphere(radius_2);
    hitable = Hitable.translation(hitable, [0.0, 0.0, -radius_2]);
    var texture0 = Texture.uniform([1.0, 1.0, 1.0]);
    var texture1 = Texture.uniform([0.85, 0.85, 0.85]);
    var texture = Texture.checker(texture0, texture1);
    var material = Material.lambertian(texture, 0.7);
    var actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  } // Light

  {
    var hitable = Hitable.sphere(4.0);
    hitable = Hitable.translation(hitable, [0.0, 5.0, 15.2]);
    var color = new Float64Array([1.0, 1.0, 1.0]);
    var texture = Texture.uniform(color);
    var material = Material.plain(texture);
    var actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  }
  var camera = Camera.new();
  camera.set_aspect(aspect);
  camera.set_fov(Math.PI * 0.25);
  camera.set_position(new Float64Array([-6.0, -10.0, 2.0]));
  camera.set_lookat(new Float64Array([0.0, 0.0, 2.0]));
  camera.set_up(new Float64Array([0.0, 0.0, 1.0]));
  scene.set_tree_type(2);
  return {
    scene: scene,
    camera: camera
  };
}

function roomScene(aspect) {
  var scene = Scene.new();
  scene.set_background([0.5, 0.5, 0.5]);
  var length = 16;
  var width = 16;
  var height = 9;
  var dimming = 0.75; // Floor

  {
    var hitable = Hitable.rectangle(length, 0, width, 1);
    hitable = Hitable.translation(hitable, [0.0, 0.0, -height / 2.0]);
    var texture0 = Texture.uniform([1.0, 1.0, 1.0]);
    var texture1 = Texture.uniform([0.8, 0.8, 0.8]);
    var texture = Texture.checker(texture0, texture1);
    var material = Material.lambertian(texture, dimming);
    var actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  } // Ceiling

  {
    var hitable = Hitable.rectangle(width, 1, length, 0);
    hitable = Hitable.translation(hitable, [0.0, 0.0, height / 2.0]);
    var texture = Texture.uniform([1.0, 1.0, 1.0]);
    var material = Material.lambertian(texture, dimming);
    var actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  } // Front

  {
    var hitable = Hitable.rectangle(length, 0, height, 2);
    hitable = Hitable.translation(hitable, [0.0, width / 2.0, 0.0]);
    var texture = Texture.uniform([1.0, 1.0, 1.0]);
    var material = Material.lambertian(texture, dimming);
    var actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  } // Back

  {
    var hitable = Hitable.rectangle(height, 2, length, 0);
    hitable = Hitable.translation(hitable, [0.0, -width / 2.0, 0.0]);
    var texture = Texture.uniform([1.0, 1.0, 1.0]);
    var material = Material.lambertian(texture, dimming);
    var actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  } // Left

  {
    var hitable = Hitable.rectangle(width, 1, height, 2);
    hitable = Hitable.translation(hitable, [-length / 2.0, 0.0, 0.0]);
    var texture = Texture.uniform([0.2, 1.0, 0.2]);
    var material = Material.lambertian(texture, dimming);
    var actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  } // Right

  {
    var hitable = Hitable.rectangle(height, 2, width, 1);
    hitable = Hitable.translation(hitable, [length / 2.0, 0.0, 0.0]);
    var texture = Texture.uniform([1.0, 0.2, 0.2]);
    var material = Material.lambertian(texture, dimming);
    var actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  } // Light

  var lightSize = length * 0.25;
  {
    var hitable = Hitable.cube(lightSize, lightSize, 0.125 * lightSize);
    hitable = Hitable.translation(hitable, [0.0, width / 4.0, height / 2.0]);
    var texture = Texture.uniform([1.0, 1.0, 1.0]);
    var material = Material.plain(texture);
    var actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  } // Metal sphere

  {
    var radius = 2.0;
    var hitable = Hitable.sphere(radius);
    hitable = Hitable.translation(hitable, [-length / 5.0, width / 4, -0.5 * height + radius]);
    var texture = Texture.uniform([0.9, 0.9, 0.9]);
    var material = Material.metal(texture, 0.0);
    var actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  } // Glass sphere

  {
    var radius = 2.0;
    var hitable = Hitable.sphere(radius);
    hitable = Hitable.translation(hitable, [length / 5.0, width / 6.0, -0.5 * height + radius]);
    var texture = Texture.uniform([1.0, 1.0, 1.0]);
    var material = Material.dielectric(texture, 2.4);
    var actor = Actor.new(hitable, material);
    scene.add_actor(actor);
  }
  var camera = Camera.new();
  camera.set_aspect(aspect);
  camera.set_fov(Math.PI * 0.35);
  camera.set_position([0.0, -0.49 * width, 0.0]);
  camera.set_direction([0.0, 1.0, 0.0]);
  camera.set_up([0.0, 0.0, 1.0]);
  scene.set_tree_type(2);
  return {
    scene: scene,
    camera: camera
  };
}

function createScene(name, aspect, seed) {
  if (name === 'random') {
    return randomScene(aspect, seed);
  } else {
    return roomScene(aspect);
  }
}

init('./ray_tracer_wasm_bg.wasm').then(function () {
  var messenger = new WorkerMessenger({
    worker: self
  });
  var scene;
  var camera;
  var width;
  var height;
  var renderer;
  var previewRenderer;
  var methods = {
    initialize: function initialize(sceneName, _width, _height, reflections, seed) {
      var out = createScene(sceneName, _width / _height, seed);
      scene = out.scene;
      camera = out.camera;
      width = _width;
      height = _height;
      renderer = Renderer.new(width, height, 0, reflections, false);
      previewRenderer = Renderer.new(width, height, 0, 0, false);
    },
    renderChunk: function renderChunk(start, stop, iteration) {
      if (!renderer) {
        throw new Error("Can't render, the scene wasn't initialized");
      }

      var theRenderer = renderer;

      if (iteration < 0) {
        theRenderer = previewRenderer;
      }

      var size = stop - start;
      var result = new Float64Array(size * 3);
      theRenderer.render_chunk(start, stop, scene, camera, result); // let color = new Float64Array(3);
      // for (let k = start; k < stop; ++k) {
      //   let i = Math.floor(k / width);
      //   let j = k % width;
      //   theRenderer.render_pixel(j, i, scene, camera, color);
      //   let idx = k - start;
      //   result[idx * 3] = color[0];
      //   result[idx * 3 + 1] = color[1];
      //   result[idx * 3 + 2] = color[2];
      // }

      return result;
    }
  };
  ChildHandshake(messenger, methods);
});
