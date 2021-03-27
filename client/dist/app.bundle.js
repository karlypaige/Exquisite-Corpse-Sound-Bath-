/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "b320ba5-" + chunkId + "-wps-hmr.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "b320ba5-wps-hmr.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "d9930b1d432cde34993b";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack-plugin-serve/client.js":
/*!****************************************!*\
  !*** (webpack)-plugin-serve/client.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/

/**
 * @note This file exists merely as an easy reference for folks adding it to their configuration entries
 */
(() => {
  /* eslint-disable global-require */
  const {
    run
  } = __webpack_require__(/*! ./lib/client/client */ "./node_modules/webpack-plugin-serve/lib/client/client.js");

  let hash = '<unknown>';
  let options;

  try {
    options = {"compress":null,"headers":null,"historyFallback":false,"hmr":true,"host":null,"liveReload":false,"log":{"level":"info","prefix":{"template":"{{level}}"},"name":"webpack-plugin-serve"},"open":true,"port":55555,"progress":true,"ramdisk":false,"secure":false,"static":["C:\\Users\\demo\\FullStackBootcamp\\forked repo\\Exquisite-Corpse-Sound-Bath-\\client"],"status":true,"address":"[::]:55555","compilerName":null,"wpsId":"b320ba5"};
  } catch (e) {
    const {
      log
    } = __webpack_require__(/*! ./lib/client/log */ "./node_modules/webpack-plugin-serve/lib/client/log.js");

    log.error('The entry for webpack-plugin-serve was included in your build, but it does not appear that the plugin was. Please check your configuration.');
  }

  try {
    // eslint-disable-next-line camelcase
    hash = __webpack_require__.h();
  } catch (e) {} // eslint-disable-line no-empty


  run(hash, options);
})();

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/ClientSocket.js":
/*!*********************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/ClientSocket.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const {
  error,
  refresh,
  warn
} = __webpack_require__(/*! ./log */ "./node_modules/webpack-plugin-serve/lib/client/log.js")(); // ignore 1008 (HTTP 400 equivalent) and 1011 (HTTP 500 equivalent)


const ignoreCodes = [1008, 1011];
const maxAttempts = 10;

class ClientSocket {
  constructor(options, ...args) {
    this.args = args;
    this.attempts = 0;
    this.eventHandlers = [];
    this.options = options;
    this.retrying = false;
    this.connect();
  }

  addEventListener(...args) {
    this.eventHandlers.push(args);
    this.socket.addEventListener(...args);
  }

  close() {
    this.socket.close();
  }

  connect() {
    if (this.socket) {
      delete this.socket;
    }

    this.connecting = true;
    this.socket = new WebSocket(...this.args);

    if (this.options.retry) {
      this.socket.addEventListener('close', event => {
        if (ignoreCodes.includes(event.code)) {
          return;
        }

        if (!this.retrying) {
          warn(`The WebSocket was closed and will attempt to reconnect`);
        }

        this.reconnect();
      });
    } else {
      this.socket.onclose = () => warn(`The client WebSocket was closed. ${refresh}`);
    }

    this.socket.addEventListener('open', () => {
      this.attempts = 0;
      this.retrying = false;
    });

    if (this.eventHandlers.length) {
      for (const [name, fn] of this.eventHandlers) {
        this.socket.addEventListener(name, fn);
      }
    }
  }

  reconnect() {
    this.attempts += 1;
    this.retrying = true;

    if (this.attempts > maxAttempts) {
      error(`The WebSocket could not be reconnected. ${refresh}`);
      this.retrying = false;
      return;
    }

    const timeout = 1000 * this.attempts ** 2;
    setTimeout(() => this.connect(this.args), timeout);
  }

  removeEventListener(...args) {
    const [, handler] = args;
    this.eventHandlers = this.eventHandlers.filter(([, fn]) => fn === handler);
    this.socket.removeEventListener(...args);
  }

}

module.exports = {
  ClientSocket
};

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/client.js":
/*!***************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/client.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/

/* eslint-disable global-require */
const run = (buildHash, options) => {
  const {
    address,
    client = {},
    progress,
    secure,
    status
  } = options;
  options.firstInstance = !window.webpackPluginServe; // eslint-disable-line no-param-reassign

  window.webpackPluginServe = window.webpackPluginServe || {
    compilers: {}
  };
  window.webpackPluginServe.silent = !!client.silent;

  const {
    ClientSocket
  } = __webpack_require__(/*! ./ClientSocket */ "./node_modules/webpack-plugin-serve/lib/client/ClientSocket.js");

  const {
    replace
  } = __webpack_require__(/*! ./hmr */ "./node_modules/webpack-plugin-serve/lib/client/hmr.js");

  const {
    error,
    info,
    warn
  } = __webpack_require__(/*! ./log */ "./node_modules/webpack-plugin-serve/lib/client/log.js")();

  const protocol = secure ? 'wss' : 'ws';
  const socket = new ClientSocket(client, `${protocol}://${client.address || address}/wps`);
  const {
    compilerName
  } = options;
  window.webpackPluginServe.compilers[compilerName] = {}; // prevents ECONNRESET errors on the server

  window.addEventListener('beforeunload', () => socket.close());
  socket.addEventListener('message', message => {
    const {
      action,
      data = {}
    } = JSON.parse(message.data);
    const {
      errors,
      hash = '<?>',
      warnings
    } = data || {};
    const shortHash = hash.slice(0, 7);
    const identifier = options.compilerName ? `(Compiler: ${options.compilerName}) ` : '';
    const compiler = window.webpackPluginServe.compilers[compilerName];
    const {
      wpsId
    } = data;

    switch (action) {
      case 'build':
        compiler.done = false;
        break;

      case 'connected':
        info(`WebSocket connected ${identifier}`);
        break;

      case 'done':
        compiler.done = true;
        break;

      case 'problems':
        if (data.errors.length) {
          error(`${identifier}Build ${shortHash} produced errors:\n`, errors);
        }

        if (data.warnings.length) {
          warn(`${identifier}Build ${shortHash} produced warnings:\n`, warnings);
        }

        break;

      case 'reload':
        window.location.reload();
        break;

      case 'replace':
        // actions with a wpsId in tow indicate actions that should only be executed when the wpsId sent
        // matches the wpsId set in options. this is how we can identify multiple compilers in the
        // client.
        if (wpsId && wpsId === options.wpsId) {
          replace(buildHash, hash);
        }

        break;

      default:
    }
  });

  if (options.firstInstance) {
    if (progress === 'minimal') {
      const {
        init
      } = __webpack_require__(/*! ./overlays/progress-minimal */ "./node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js");

      init(options, socket);
    } else if (progress) {
      const {
        init
      } = __webpack_require__(/*! ./overlays/progress */ "./node_modules/webpack-plugin-serve/lib/client/overlays/progress.js");

      init(options, socket);
    }

    if (status) {
      const {
        init
      } = __webpack_require__(/*! ./overlays/status */ "./node_modules/webpack-plugin-serve/lib/client/overlays/status.js");

      init(options, socket);
    }

    if (true) {
      info('Hot Module Replacement is active');

      if (options.liveReload) {
        info('Live Reload taking precedence over Hot Module Replacement');
      }
    } else {}

    if (false) {}
  }
};

module.exports = {
  run
};

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/hmr.js":
/*!************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/hmr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const {
  error,
  info,
  refresh,
  warn
} = __webpack_require__(/*! ./log */ "./node_modules/webpack-plugin-serve/lib/client/log.js")();

let latest = true;
const hmr = {
  onUnaccepted(data) {
    warn('Change in unaccepted module(s):\n', data);
    warn(data);
  },

  onDeclined(data) {
    warn('Change in declined module(s):\n', data);
  },

  onErrored(data) {
    error('Error in module(s):\n', data);
  }

};

const replace = async (buildHash, hash) => {
  const {
    apply,
    check,
    status
  } = module.hot;

  if (hash) {
    // eslint-disable-next-line no-undef
    latest = hash.includes(buildHash);
  }

  if (!latest) {
    const hmrStatus = status();

    if (hmrStatus === 'abort' || hmrStatus === 'fail') {
      warn(`An HMR update was triggered, but ${hmrStatus}ed. ${refresh}`);
      return;
    }

    let modules;

    try {
      modules = await check(false);
    } catch (e) {
      // noop. this typically happens when a MultiCompiler has more than one compiler that includes
      // this script, and an update happens with a hash that isn't part of the compiler/module this
      // instance was loaded for.
      return;
    }

    if (!modules) {
      warn(`No modules found for replacement. ${refresh}`);
      return;
    }

    modules = await apply(hmr);

    if (modules) {
      latest = true;
      info(`Build ${hash.slice(0, 7)} replaced:\n`, modules);
    }
  }
};

module.exports = {
  replace
};

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/log.js":
/*!************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/log.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const {
  error,
  info,
  warn
} = console;
const log = {
  error: error.bind(console, '⬡ wps:'),
  info: info.bind(console, '⬡ wps:'),
  refresh: 'Please refresh the page',
  warn: warn.bind(console, '⬡ wps:')
};

const noop = () => {};

const silent = {
  error: noop,
  info: noop,
  warn: noop
};

module.exports = () => window.webpackPluginServe.silent ? silent : log;

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js":
/*!**********************************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/overlays/progress-minimal.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell, Matheus Gonçalves da Silva

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const {
  addCss,
  addHtml
} = __webpack_require__(/*! ./util */ "./node_modules/webpack-plugin-serve/lib/client/overlays/util.js");

const ns = 'wps-progress-minimal';
const html = `
<div id="${ns}" class="${ns}-hidden">
  <div id="${ns}-bar"></div>
</div>
`;
const css = `
#${ns} {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 100vw;
  z-index: 2147483645;
}

#${ns}-bar {
  width: 0%;
  height: 4px;
  background-color: rgb(186, 223, 172);
  transition: width 1s ease-in-out;
}

.${ns}-hidden{
  display: none;
}
`;

const update = percent => {
  const bar = document.querySelector(`#${ns}-bar`);
  bar.style.width = `${percent}%`;
};

const reset = wrapper => {
  wrapper.classList.add(`${ns}-hidden`);
  setTimeout(() => update(0), 1e3);
};

const init = (options, socket) => {
  if (options.firstInstance) {
    document.addEventListener('DOMContentLoaded', () => {
      addCss(css);
      addHtml(html);
    });
  }

  socket.addEventListener('message', message => {
    const {
      action,
      data
    } = JSON.parse(message.data);

    if (action !== 'progress') {
      return;
    }

    const percent = Math.floor(data.percent * 100);
    const wrapper = document.querySelector(`#${ns}`);
    wrapper.classList.remove(`${ns}-hidden`);

    if (data.percent === 1) {
      setTimeout(() => reset(wrapper), 5e3);
    }

    update(percent);
  });
};

module.exports = {
  init
};

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/progress.js":
/*!**************************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/overlays/progress.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell, Matheus Gonçalves da Silva

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const {
  addCss,
  addHtml
} = __webpack_require__(/*! ./util */ "./node_modules/webpack-plugin-serve/lib/client/overlays/util.js");

const ns = 'wps-progress';
const css = `
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');

#${ns}{
  width: 200px;
  height: 200px;
  position: absolute;
  right: 5%;
  top: 5%;
  transition: opacity .25s ease-in-out;
  z-index: 2147483645;
}

#${ns}-bg {
  fill: #282d35;
}

#${ns}-fill {
  fill: rgba(0, 0, 0, 0);
  stroke: rgb(186, 223, 172);
  stroke-dasharray: 219.99078369140625;
  stroke-dashoffset: -219.99078369140625;
  stroke-width: 10;
  transform: rotate(90deg)translate(0px, -80px);
  transition: stroke-dashoffset 1s;
}

#${ns}-percent {
  font-family: 'Open Sans';
  font-size: 18px;
  fill: #ffffff;
}

#${ns}-percent-value {
  dominant-baseline: middle;
  text-anchor: middle;
}

#${ns}-percent-super {
  fill: #bdc3c7;
  font-size: .45em;
  baseline-shift: 10%;
}

.${ns}-noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
}

@keyframes ${ns}-hidden-display {
	0% {
		opacity: 1;
		transform: scale(1);
		-webkit-transform: scale(1);
	}
	99% {
		display: inline-flex;
		opacity: 0;
		transform: scale(0);
		-webkit-transform: scale(0);
	}
	100% {
		display: none;
		opacity: 0;
		transform: scale(0);
		-webkit-transform: scale(0);
	}
}

.${ns}-hidden {
  animation: ${ns}-hidden-display .3s;
  animation-fill-mode:forwards;
  display: inline-flex;
}

.${ns}-hidden-onload {
  display: none;
}
`;
const html = `
<svg id="${ns}" class="${ns}-noselect ${ns}-hidden-onload" x="0px" y="0px" viewBox="0 0 80 80">
  <circle id="${ns}-bg" cx="50%" cy="50%" r="35"></circle>
  <path id="${ns}-fill" d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0" />
  <text id="${ns}-percent" x="50%" y="51%"><tspan id="${ns}-percent-value">0</tspan><tspan id="${ns}-percent-super">%</tspan></text>
</svg>
`;

const update = percent => {
  const max = -219.99078369140625;
  const value = document.querySelector(`#${ns}-percent-value`);
  const track = document.querySelector(`#${ns}-fill`);
  const offset = (100 - percent) / 100 * max;
  track.setAttribute('style', `stroke-dashoffset: ${offset}`);
  value.innerHTML = percent.toString();
};

const reset = svg => {
  svg.classList.add(`${ns}-hidden`);
  setTimeout(() => update(0), 1e3);
};

const init = (options, socket) => {
  if (options.firstInstance) {
    document.addEventListener('DOMContentLoaded', () => {
      addCss(css);
      addHtml(html);
    });
  }

  socket.addEventListener('message', message => {
    const {
      action,
      data
    } = JSON.parse(message.data);

    if (action !== 'progress') {
      return;
    }

    const percent = Math.floor(data.percent * 100);
    const svg = document.querySelector(`#${ns}`);

    if (!svg) {
      return;
    } // we can safely call this even if it doesn't have the class


    svg.classList.remove(`${ns}-hidden`, `${ns}-hidden-onload`);

    if (data.percent === 1) {
      setTimeout(() => reset(svg), 5e3);
    }

    update(percent);
  });
};

module.exports = {
  init
};

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/status.js":
/*!************************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/overlays/status.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const {
  addCss,
  addHtml,
  socketMessage
} = __webpack_require__(/*! ./util */ "./node_modules/webpack-plugin-serve/lib/client/overlays/util.js");

const ns = 'wps-status';
const css = `
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');

#${ns} {
  background: #282d35;
  border-radius: 0.6em;
  display: flex;
  flex-direction: column;
	font-family: 'Open Sans', Helvetica, Arial, sans-serif;
	font-size: 10px;
  height: 90%;
  min-height: 20em;
  left: 50%;
  opacity: 1;
  overflow: hidden;
  padding-bottom: 3em;
  position: absolute;
  top: 2rem;
  transform: translateX(-50%);
  transition: opacity .25s ease-in-out;
  width: 95%;
  z-index: 2147483645;
}

@keyframes ${ns}-hidden-display {
	0% {
		opacity: 1;
	}
	99% {
		display: inline-flex;
		opacity: 0;
	}
	100% {
		display: none;
		opacity: 0;
	}
}

#${ns}.${ns}-hidden {
  animation: ${ns}-hidden-display .3s;
  animation-fill-mode:forwards;
  display: none;
}

#${ns}.${ns}-min {
  animation: minimize 10s;
  bottom: 2em;
  cursor: pointer;
  height: 6em;
  left: auto;
  min-height: 6em;
  padding-bottom: 0;
  position: absolute;
  right: 2em;
  top: auto;
  transform: none;
  width: 6em;
}

#${ns}.${ns}-min #${ns}-beacon {
  display: block;
}

#${ns}-title {
  color: #fff;
  font-size: 1.2em;
  font-weight: normal;
  margin: 0;
  padding: 0.6em 0;
  text-align: center;
  width: 100%;
}

#${ns}.${ns}-min #${ns}-title {
  display: none;
}

#${ns}-title-errors {
  color: #ff5f58;
  font-style: normal;
  padding-left: 1em;
}

#${ns}-title-warnings {
  color: #ffbd2e;
  font-style: normal;
  padding-left: 1em;
}

#${ns}-problems {
  overflow-y: auto;
  padding: 1em 2em;
}

#${ns}-problems pre {
  color: #ddd;
  background: #282d35;
  display: block;
  font-size: 1.3em;
	font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  white-space: pre-wrap;
}

#${ns}-problems pre em {
  background: #ff5f58;
  border-radius: 0.3em;
  color: #641e16;
  font-style: normal;
  line-height: 3em;
  margin-right: 0.4em;
  padding: 0.1em 0.4em;
  text-transform: uppercase;
}

pre#${ns}-warnings em {
  background: #ffbd2e;
  color: #3e2723;
}

pre#${ns}-success {
  display: none;
  text-align: center;
}

pre#${ns}-success em {
  background: #7fb900;
  color: #004d40;
}

#${ns}-problems.${ns}-success #${ns}-success {
  display: block;
}

#${ns}.${ns}-min #${ns}-problems {
  display: none;
}

#${ns}-nav {
  opacity: 0.5;
  padding: 1.2em;
  position: absolute;
}

#${ns}.${ns}-min #${ns}-nav {
  display: none;
}

#${ns}-nav:hover {
  opacity: 1;
}

#${ns}-nav div {
  background: #ff5f58;
  border-radius: 1.2em;
  cursor: pointer;
  display: inline-block;
  height: 1.2em;
  position: relative;
  width: 1.2em;
}

div#${ns}-min {
  background: #ffbd2e;
  margin-left: 0.8em;
}

#${ns}-beacon {
  border-radius: 3em;
  display: none;
  font-size: 10px;
  height: 3em;
  margin: 1.6em auto;
  position: relative;
  width: 3em;
}

#${ns}-beacon:before, #${ns}-beacon:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(127,185,0, 0.2);
  border-radius: 3em;
  opacity: 0;
}

#${ns}-beacon:before {
  animation: ${ns}-pulse 3s infinite linear;
  transform: scale(1);
}

#${ns}-beacon:after {
  animation: ${ns}-pulse 3s 2s infinite linear;
}


@keyframes ${ns}-pulse {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  33% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.4);
  }
}

#${ns}-beacon mark {
  background: rgba(127, 185, 0, 1);
  border-radius: 100% 100%;
  height: 1em;
  left: 1em;
  position: absolute;
  top: 1em;
  width: 1em;
}

#${ns}-beacon.${ns}-error mark {
  background: #ff5f58;
}

#${ns}-beacon.${ns}-error:before, #${ns}-beacon.error:after {
  background: rgba(255, 95, 88, 0.2);
}

#${ns}-beacon.${ns}-warning mark {
  background: #ffbd2e;
}

#${ns}-beacon.${ns}-warning:before, #${ns}-beacon.warning:after {
  background: rgba(255, 189, 46, 0.2);
}
`;
const html = `
<aside id="${ns}" class="${ns}-hidden" title="build status">
  <figure id="${ns}-beacon">
    <mark/>
  </figure>
  <nav id="${ns}-nav">
    <div id="${ns}-close" title="close"></div>
    <div id="${ns}-min" title="minmize"></div>
  </nav>
  <h1 id="${ns}-title">
    build status
    <em id="${ns}-title-errors"></em>
    <em id="${ns}-title-warnings"></em>
  </h1>
  <article id="${ns}-problems">
    <pre id="${ns}-success"><em>Build Successful</em></pre>
    <pre id="${ns}-errors"></pre>
    <pre id="${ns}-warnings"></pre>
  </article>
</aside>
`;

const init = (options, socket) => {
  const hidden = `${ns}-hidden`;
  let hasProblems = false;
  let aside;
  let beacon;
  let problems;
  let preErrors;
  let preWarnings;
  let titleErrors;
  let titleWarnings;

  const reset = () => {
    preErrors.innerHTML = '';
    preWarnings.innerHTML = '';
    problems.classList.remove(`${ns}-success`);
    beacon.className = '';
    titleErrors.innerText = '';
    titleWarnings.innerText = '';
  };

  const addErrors = errors => {
    if (errors.length) {
      problems.classList.remove(`${ns}-success`);
      beacon.classList.add(`${ns}-error`);

      for (const error of errors) {
        const markup = `<div><em>Error</em> in ${error}</div>`;
        addHtml(markup, preErrors);
      }

      titleErrors.innerText = `${errors.length} Error(s)`;
    } else {
      titleErrors.innerText = '';
    }

    aside.classList.remove(hidden);
  };

  const addWarnings = warnings => {
    if (warnings.length) {
      problems.classList.remove(`${ns}-success`);

      if (!beacon.classList.contains(`${ns}-error`)) {
        beacon.classList.add(`${ns}-warning`);
      }

      for (const warning of warnings) {
        const markup = `<div><em>Warning</em> in ${warning}</div>`;
        addHtml(markup, preWarnings);
      }

      titleWarnings.innerText = `${warnings.length} Warning(s)`;
    } else {
      titleWarnings.innerText = '';
    }

    aside.classList.remove(hidden);
  };

  if (options.firstInstance) {
    document.addEventListener('DOMContentLoaded', () => {
      addCss(css);
      [aside] = addHtml(html);
      beacon = document.querySelector(`#${ns}-beacon`);
      problems = document.querySelector(`#${ns}-problems`);
      preErrors = document.querySelector(`#${ns}-errors`);
      preWarnings = document.querySelector(`#${ns}-warnings`);
      titleErrors = document.querySelector(`#${ns}-title-errors`);
      titleWarnings = document.querySelector(`#${ns}-title-warnings`);
      const close = document.querySelector(`#${ns}-close`);
      const min = document.querySelector(`#${ns}-min`);
      aside.addEventListener('click', () => {
        aside.classList.remove(`${ns}-min`);
      });
      close.addEventListener('click', () => {
        aside.classList.add(`${ns}-hidden`);
      });
      min.addEventListener('click', e => {
        aside.classList.add(`${ns}-min`);
        e.stopImmediatePropagation();
      });
    });
  }

  socketMessage(socket, (action, data) => {
    if (!aside) {
      return;
    }

    const {
      compilers
    } = window.webpackPluginServe;

    switch (action) {
      case 'build':
        // clear errors and warnings when a new build begins
        reset();
        break;

      case 'problems':
        addErrors(data.errors);
        addWarnings(data.warnings);
        aside.classList.remove(hidden);
        hasProblems = data.errors.length || data.warnings.length;
        break;

      case 'replace':
        // if there's a compiler that isn't done yet, hold off and let it run the show
        for (const compilerName of Object.keys(compilers)) {
          if (!compilers[compilerName]) {
            return;
          }
        }

        if (hasProblems && !preErrors.children.length && !preWarnings.children.length) {
          reset();
          hasProblems = false;
          problems.classList.add(`${ns}-success`);
          aside.classList.remove(hidden);
          setTimeout(() => aside.classList.add(hidden), 3e3);
        }

        break;

      default:
    }
  });
};

module.exports = {
  init
};

/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/util.js":
/*!**********************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/overlays/util.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const addHtml = (html, parent) => {
  const div = document.createElement('div');
  const nodes = [];
  div.innerHTML = html.trim();

  while (div.firstChild) {
    nodes.push((parent || document.body).appendChild(div.firstChild));
  }

  return nodes;
};

const addCss = css => {
  const style = document.createElement('style');
  style.type = 'text/css';

  if (css.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  } // append the stylesheet for the svg


  document.head.appendChild(style);
};

const socketMessage = (socket, handler) => {
  socket.addEventListener('message', message => {
    const {
      action,
      data = {}
    } = JSON.parse(message.data);
    handler(action, data);
  });
};

module.exports = {
  addCss,
  addHtml,
  socketMessage
};

/***/ }),

/***/ 0:
/*!********************************************************!*\
  !*** multi ./src/index.js webpack-plugin-serve/client ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!(function webpackMissingModule() { var e = new Error("Cannot find module './src/index.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
module.exports = __webpack_require__(/*! webpack-plugin-serve/client */"./node_modules/webpack-plugin-serve/client.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1wbHVnaW4tc2VydmUvY2xpZW50LmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvQ2xpZW50U29ja2V0LmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvY2xpZW50LmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvaG1yLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvbG9nLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvcHJvZ3Jlc3MtbWluaW1hbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLXBsdWdpbi1zZXJ2ZS9saWIvY2xpZW50L292ZXJsYXlzL3Byb2dyZXNzLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvc3RhdHVzLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvdXRpbC5qcyJdLCJuYW1lcyI6WyJydW4iLCJyZXF1aXJlIiwiaGFzaCIsIm9wdGlvbnMiLCLKjsmQybnJlG9zx53KjMm5x51zIiwiZSIsImxvZyIsImVycm9yIiwiX193ZWJwYWNrX2hhc2hfXyIsInJlZnJlc2giLCJ3YXJuIiwiaWdub3JlQ29kZXMiLCJtYXhBdHRlbXB0cyIsIkNsaWVudFNvY2tldCIsImNvbnN0cnVjdG9yIiwiYXJncyIsImF0dGVtcHRzIiwiZXZlbnRIYW5kbGVycyIsInJldHJ5aW5nIiwiY29ubmVjdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwdXNoIiwic29ja2V0IiwiY2xvc2UiLCJjb25uZWN0aW5nIiwiV2ViU29ja2V0IiwicmV0cnkiLCJldmVudCIsImluY2x1ZGVzIiwiY29kZSIsInJlY29ubmVjdCIsIm9uY2xvc2UiLCJsZW5ndGgiLCJuYW1lIiwiZm4iLCJ0aW1lb3V0Iiwic2V0VGltZW91dCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJoYW5kbGVyIiwiZmlsdGVyIiwibW9kdWxlIiwiZXhwb3J0cyIsImJ1aWxkSGFzaCIsImFkZHJlc3MiLCJjbGllbnQiLCJwcm9ncmVzcyIsInNlY3VyZSIsInN0YXR1cyIsImZpcnN0SW5zdGFuY2UiLCJ3aW5kb3ciLCJ3ZWJwYWNrUGx1Z2luU2VydmUiLCJjb21waWxlcnMiLCJzaWxlbnQiLCJyZXBsYWNlIiwiaW5mbyIsInByb3RvY29sIiwiY29tcGlsZXJOYW1lIiwibWVzc2FnZSIsImFjdGlvbiIsImRhdGEiLCJKU09OIiwicGFyc2UiLCJlcnJvcnMiLCJ3YXJuaW5ncyIsInNob3J0SGFzaCIsInNsaWNlIiwiaWRlbnRpZmllciIsImNvbXBpbGVyIiwid3BzSWQiLCJkb25lIiwibG9jYXRpb24iLCJyZWxvYWQiLCJpbml0IiwibGl2ZVJlbG9hZCIsImxhdGVzdCIsImhtciIsIm9uVW5hY2NlcHRlZCIsIm9uRGVjbGluZWQiLCJvbkVycm9yZWQiLCJhcHBseSIsImNoZWNrIiwiaG90IiwiaG1yU3RhdHVzIiwibW9kdWxlcyIsImNvbnNvbGUiLCJiaW5kIiwibm9vcCIsImFkZENzcyIsImFkZEh0bWwiLCJucyIsImh0bWwiLCJjc3MiLCJ1cGRhdGUiLCJwZXJjZW50IiwiYmFyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic3R5bGUiLCJ3aWR0aCIsInJlc2V0Iiwid3JhcHBlciIsImNsYXNzTGlzdCIsImFkZCIsIk1hdGgiLCJmbG9vciIsInJlbW92ZSIsIm1heCIsInZhbHVlIiwidHJhY2siLCJvZmZzZXQiLCJzZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJ0b1N0cmluZyIsInN2ZyIsInNvY2tldE1lc3NhZ2UiLCJoaWRkZW4iLCJoYXNQcm9ibGVtcyIsImFzaWRlIiwiYmVhY29uIiwicHJvYmxlbXMiLCJwcmVFcnJvcnMiLCJwcmVXYXJuaW5ncyIsInRpdGxlRXJyb3JzIiwidGl0bGVXYXJuaW5ncyIsImNsYXNzTmFtZSIsImlubmVyVGV4dCIsImFkZEVycm9ycyIsIm1hcmt1cCIsImFkZFdhcm5pbmdzIiwiY29udGFpbnMiLCJ3YXJuaW5nIiwibWluIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiT2JqZWN0Iiwia2V5cyIsImNoaWxkcmVuIiwicGFyZW50IiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsIm5vZGVzIiwidHJpbSIsImZpcnN0Q2hpbGQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJ0eXBlIiwic3R5bGVTaGVldCIsImNzc1RleHQiLCJjcmVhdGVUZXh0Tm9kZSIsImhlYWQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsR0FBRzs7UUFFSDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7O1FBRUw7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsNkJBQTZCO1FBQzdCLDZCQUE2QjtRQUM3QjtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHFCQUFxQixnQkFBZ0I7UUFDckM7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxxQkFBcUIsZ0JBQWdCO1FBQ3JDO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7O1FBRUw7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0Esa0JBQWtCLDhCQUE4QjtRQUNoRDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxvQkFBb0IsMkJBQTJCO1FBQy9DO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLG1CQUFtQixjQUFjO1FBQ2pDO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxnQkFBZ0IsS0FBSztRQUNyQjtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQixZQUFZO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0EsY0FBYyw0QkFBNEI7UUFDMUM7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJOztRQUVKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBO1FBQ0EsZUFBZSw0QkFBNEI7UUFDM0M7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQSxlQUFlLDRCQUE0QjtRQUMzQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztR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d0YsRUFBRSxHQUFHLFlBQVg7QUFDQSxNQUFNRSxHQUFHLEdBQUk7QUFDYjtBQUNBO0FBQ0EsR0FBR0YsRUFBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhQSxFQUFHO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBR0EsRUFBRyxJQUFHQSxFQUFHO0FBQ1osZUFBZUEsRUFBRztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUdBLEVBQUcsSUFBR0EsRUFBRztBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHQSxFQUFHLElBQUdBLEVBQUcsU0FBUUEsRUFBRztBQUN2QjtBQUNBO0FBQ0E7QUFDQSxHQUFHQSxFQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBR0EsRUFBRyxJQUFHQSxFQUFHLFNBQVFBLEVBQUc7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsR0FBR0EsRUFBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHQSxFQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUdBLEVBQUc7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUdBLEVBQUc7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBR0EsRUFBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTUEsRUFBRztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTUEsRUFBRztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTUEsRUFBRztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBR0EsRUFBRyxhQUFZQSxFQUFHLGFBQVlBLEVBQUc7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsR0FBR0EsRUFBRyxJQUFHQSxFQUFHLFNBQVFBLEVBQUc7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsR0FBR0EsRUFBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHQSxFQUFHLElBQUdBLEVBQUcsU0FBUUEsRUFBRztBQUN2QjtBQUNBO0FBQ0E7QUFDQSxHQUFHQSxFQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0EsR0FBR0EsRUFBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU1BLEVBQUc7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUdBLEVBQUc7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHQSxFQUFHLG9CQUFtQkEsRUFBRztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBR0EsRUFBRztBQUNOLGVBQWVBLEVBQUc7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsR0FBR0EsRUFBRztBQUNOLGVBQWVBLEVBQUc7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYUEsRUFBRztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBR0EsRUFBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUdBLEVBQUcsV0FBVUEsRUFBRztBQUNuQjtBQUNBO0FBQ0E7QUFDQSxHQUFHQSxFQUFHLFdBQVVBLEVBQUcsbUJBQWtCQSxFQUFHO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLEdBQUdBLEVBQUcsV0FBVUEsRUFBRztBQUNuQjtBQUNBO0FBQ0E7QUFDQSxHQUFHQSxFQUFHLFdBQVVBLEVBQUcscUJBQW9CQSxFQUFHO0FBQzFDO0FBQ0E7QUFDQSxDQTlPQTtBQWdQQSxNQUFNQyxJQUFJLEdBQUk7QUFDZCxhQUFhRCxFQUFHLFlBQVdBLEVBQUc7QUFDOUIsZ0JBQWdCQSxFQUFHO0FBQ25CO0FBQ0E7QUFDQSxhQUFhQSxFQUFHO0FBQ2hCLGVBQWVBLEVBQUc7QUFDbEIsZUFBZUEsRUFBRztBQUNsQjtBQUNBLFlBQVlBLEVBQUc7QUFDZjtBQUNBLGNBQWNBLEVBQUc7QUFDakIsY0FBY0EsRUFBRztBQUNqQjtBQUNBLGlCQUFpQkEsRUFBRztBQUNwQixlQUFlQSxFQUFHO0FBQ2xCLGVBQWVBLEVBQUc7QUFDbEIsZUFBZUEsRUFBRztBQUNsQjtBQUNBO0FBQ0EsQ0FwQkE7O0FBc0JBLE1BQU1qQixJQUFJLEdBQUcsQ0FBQ3JFLE9BQUQsRUFBVW1CLE1BQVYsS0FBcUI7QUFDaEMsUUFBTTZGLE1BQU0sR0FBSSxHQUFFMUIsRUFBRyxTQUFyQjtBQUNBLE1BQUkyQixXQUFXLEdBQUcsS0FBbEI7QUFDQSxNQUFJQyxLQUFKO0FBQ0EsTUFBSUMsTUFBSjtBQUNBLE1BQUlDLFFBQUo7QUFDQSxNQUFJQyxTQUFKO0FBQ0EsTUFBSUMsV0FBSjtBQUNBLE1BQUlDLFdBQUo7QUFDQSxNQUFJQyxhQUFKOztBQUVBLFFBQU14QixLQUFLLEdBQUcsTUFBTTtBQUNsQnFCLGFBQVMsQ0FBQ1QsU0FBVixHQUFzQixFQUF0QjtBQUNBVSxlQUFXLENBQUNWLFNBQVosR0FBd0IsRUFBeEI7QUFDQVEsWUFBUSxDQUFDbEIsU0FBVCxDQUFtQkksTUFBbkIsQ0FBMkIsR0FBRWhCLEVBQUcsVUFBaEM7QUFDQTZCLFVBQU0sQ0FBQ00sU0FBUCxHQUFtQixFQUFuQjtBQUNBRixlQUFXLENBQUNHLFNBQVosR0FBd0IsRUFBeEI7QUFDQUYsaUJBQWEsQ0FBQ0UsU0FBZCxHQUEwQixFQUExQjtBQUNELEdBUEQ7O0FBU0EsUUFBTUMsU0FBUyxHQUFJaEUsTUFBRCxJQUFZO0FBQzVCLFFBQUlBLE1BQU0sQ0FBQzlCLE1BQVgsRUFBbUI7QUFDakJ1RixjQUFRLENBQUNsQixTQUFULENBQW1CSSxNQUFuQixDQUEyQixHQUFFaEIsRUFBRyxVQUFoQztBQUNBNkIsWUFBTSxDQUFDakIsU0FBUCxDQUFpQkMsR0FBakIsQ0FBc0IsR0FBRWIsRUFBRyxRQUEzQjs7QUFFQSxXQUFLLE1BQU1sRixLQUFYLElBQW9CdUQsTUFBcEIsRUFBNEI7QUFDMUIsY0FBTWlFLE1BQU0sR0FBSSwwQkFBeUJ4SCxLQUFNLFFBQS9DO0FBQ0FpRixlQUFPLENBQUN1QyxNQUFELEVBQVNQLFNBQVQsQ0FBUDtBQUNEOztBQUVERSxpQkFBVyxDQUFDRyxTQUFaLEdBQXlCLEdBQUUvRCxNQUFNLENBQUM5QixNQUFPLFdBQXpDO0FBQ0QsS0FWRCxNQVVPO0FBQ0wwRixpQkFBVyxDQUFDRyxTQUFaLEdBQXdCLEVBQXhCO0FBQ0Q7O0FBQ0RSLFNBQUssQ0FBQ2hCLFNBQU4sQ0FBZ0JJLE1BQWhCLENBQXVCVSxNQUF2QjtBQUNELEdBZkQ7O0FBaUJBLFFBQU1hLFdBQVcsR0FBSWpFLFFBQUQsSUFBYztBQUNoQyxRQUFJQSxRQUFRLENBQUMvQixNQUFiLEVBQXFCO0FBQ25CdUYsY0FBUSxDQUFDbEIsU0FBVCxDQUFtQkksTUFBbkIsQ0FBMkIsR0FBRWhCLEVBQUcsVUFBaEM7O0FBRUEsVUFBSSxDQUFDNkIsTUFBTSxDQUFDakIsU0FBUCxDQUFpQjRCLFFBQWpCLENBQTJCLEdBQUV4QyxFQUFHLFFBQWhDLENBQUwsRUFBK0M7QUFDN0M2QixjQUFNLENBQUNqQixTQUFQLENBQWlCQyxHQUFqQixDQUFzQixHQUFFYixFQUFHLFVBQTNCO0FBQ0Q7O0FBRUQsV0FBSyxNQUFNeUMsT0FBWCxJQUFzQm5FLFFBQXRCLEVBQWdDO0FBQzlCLGNBQU1nRSxNQUFNLEdBQUksNEJBQTJCRyxPQUFRLFFBQW5EO0FBQ0ExQyxlQUFPLENBQUN1QyxNQUFELEVBQVNOLFdBQVQsQ0FBUDtBQUNEOztBQUVERSxtQkFBYSxDQUFDRSxTQUFkLEdBQTJCLEdBQUU5RCxRQUFRLENBQUMvQixNQUFPLGFBQTdDO0FBQ0QsS0FiRCxNQWFPO0FBQ0wyRixtQkFBYSxDQUFDRSxTQUFkLEdBQTBCLEVBQTFCO0FBQ0Q7O0FBRURSLFNBQUssQ0FBQ2hCLFNBQU4sQ0FBZ0JJLE1BQWhCLENBQXVCVSxNQUF2QjtBQUNELEdBbkJEOztBQXFCQSxNQUFJaEgsT0FBTyxDQUFDNkMsYUFBWixFQUEyQjtBQUN6QitDLFlBQVEsQ0FBQzNFLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxNQUFNO0FBQ2xEbUUsWUFBTSxDQUFDSSxHQUFELENBQU47QUFDQSxPQUFDMEIsS0FBRCxJQUFVN0IsT0FBTyxDQUFDRSxJQUFELENBQWpCO0FBQ0E0QixZQUFNLEdBQUd2QixRQUFRLENBQUNDLGFBQVQsQ0FBd0IsSUFBR1AsRUFBRyxTQUE5QixDQUFUO0FBQ0E4QixjQUFRLEdBQUd4QixRQUFRLENBQUNDLGFBQVQsQ0FBd0IsSUFBR1AsRUFBRyxXQUE5QixDQUFYO0FBQ0ErQixlQUFTLEdBQUd6QixRQUFRLENBQUNDLGFBQVQsQ0FBd0IsSUFBR1AsRUFBRyxTQUE5QixDQUFaO0FBQ0FnQyxpQkFBVyxHQUFHMUIsUUFBUSxDQUFDQyxhQUFULENBQXdCLElBQUdQLEVBQUcsV0FBOUIsQ0FBZDtBQUNBaUMsaUJBQVcsR0FBRzNCLFFBQVEsQ0FBQ0MsYUFBVCxDQUF3QixJQUFHUCxFQUFHLGVBQTlCLENBQWQ7QUFDQWtDLG1CQUFhLEdBQUc1QixRQUFRLENBQUNDLGFBQVQsQ0FBd0IsSUFBR1AsRUFBRyxpQkFBOUIsQ0FBaEI7QUFFQSxZQUFNbEUsS0FBSyxHQUFHd0UsUUFBUSxDQUFDQyxhQUFULENBQXdCLElBQUdQLEVBQUcsUUFBOUIsQ0FBZDtBQUNBLFlBQU0wQyxHQUFHLEdBQUdwQyxRQUFRLENBQUNDLGFBQVQsQ0FBd0IsSUFBR1AsRUFBRyxNQUE5QixDQUFaO0FBRUE0QixXQUFLLENBQUNqRyxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxNQUFNO0FBQ3BDaUcsYUFBSyxDQUFDaEIsU0FBTixDQUFnQkksTUFBaEIsQ0FBd0IsR0FBRWhCLEVBQUcsTUFBN0I7QUFDRCxPQUZEO0FBSUFsRSxXQUFLLENBQUNILGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLE1BQU07QUFDcENpRyxhQUFLLENBQUNoQixTQUFOLENBQWdCQyxHQUFoQixDQUFxQixHQUFFYixFQUFHLFNBQTFCO0FBQ0QsT0FGRDtBQUlBMEMsU0FBRyxDQUFDL0csZ0JBQUosQ0FBcUIsT0FBckIsRUFBK0JmLENBQUQsSUFBTztBQUNuQ2dILGFBQUssQ0FBQ2hCLFNBQU4sQ0FBZ0JDLEdBQWhCLENBQXFCLEdBQUViLEVBQUcsTUFBMUI7QUFDQXBGLFNBQUMsQ0FBQytILHdCQUFGO0FBQ0QsT0FIRDtBQUlELEtBekJEO0FBMEJEOztBQUVEbEIsZUFBYSxDQUFDNUYsTUFBRCxFQUFTLENBQUNvQyxNQUFELEVBQVNDLElBQVQsS0FBa0I7QUFDdEMsUUFBSSxDQUFDMEQsS0FBTCxFQUFZO0FBQ1Y7QUFDRDs7QUFFRCxVQUFNO0FBQUVsRTtBQUFGLFFBQWdCRixNQUFNLENBQUNDLGtCQUE3Qjs7QUFFQSxZQUFRUSxNQUFSO0FBQ0UsV0FBSyxPQUFMO0FBQ0U7QUFDQXlDLGFBQUs7QUFDTDs7QUFDRixXQUFLLFVBQUw7QUFDRTJCLGlCQUFTLENBQUNuRSxJQUFJLENBQUNHLE1BQU4sQ0FBVDtBQUNBa0UsbUJBQVcsQ0FBQ3JFLElBQUksQ0FBQ0ksUUFBTixDQUFYO0FBQ0FzRCxhQUFLLENBQUNoQixTQUFOLENBQWdCSSxNQUFoQixDQUF1QlUsTUFBdkI7QUFDQUMsbUJBQVcsR0FBR3pELElBQUksQ0FBQ0csTUFBTCxDQUFZOUIsTUFBWixJQUFzQjJCLElBQUksQ0FBQ0ksUUFBTCxDQUFjL0IsTUFBbEQ7QUFDQTs7QUFDRixXQUFLLFNBQUw7QUFDRTtBQUNBLGFBQUssTUFBTXdCLFlBQVgsSUFBMkI2RSxNQUFNLENBQUNDLElBQVAsQ0FBWW5GLFNBQVosQ0FBM0IsRUFBbUQ7QUFDakQsY0FBSSxDQUFDQSxTQUFTLENBQUNLLFlBQUQsQ0FBZCxFQUE4QjtBQUM1QjtBQUNEO0FBQ0Y7O0FBRUQsWUFBSTRELFdBQVcsSUFBSSxDQUFDSSxTQUFTLENBQUNlLFFBQVYsQ0FBbUJ2RyxNQUFuQyxJQUE2QyxDQUFDeUYsV0FBVyxDQUFDYyxRQUFaLENBQXFCdkcsTUFBdkUsRUFBK0U7QUFDN0VtRSxlQUFLO0FBQ0xpQixxQkFBVyxHQUFHLEtBQWQ7QUFDQUcsa0JBQVEsQ0FBQ2xCLFNBQVQsQ0FBbUJDLEdBQW5CLENBQXdCLEdBQUViLEVBQUcsVUFBN0I7QUFDQTRCLGVBQUssQ0FBQ2hCLFNBQU4sQ0FBZ0JJLE1BQWhCLENBQXVCVSxNQUF2QjtBQUVBL0Usb0JBQVUsQ0FBQyxNQUFNaUYsS0FBSyxDQUFDaEIsU0FBTixDQUFnQkMsR0FBaEIsQ0FBb0JhLE1BQXBCLENBQVAsRUFBb0MsR0FBcEMsQ0FBVjtBQUNEOztBQUNEOztBQUNGO0FBNUJGO0FBOEJELEdBckNZLENBQWI7QUFzQ0QsQ0E3SEQ7O0FBK0hBM0UsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQUUrQjtBQUFGLENBQWpCLEM7Ozs7Ozs7Ozs7O0FDbFpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTWdCLE9BQU8sR0FBRyxDQUFDRSxJQUFELEVBQU84QyxNQUFQLEtBQWtCO0FBQ2hDLFFBQU1DLEdBQUcsR0FBRzFDLFFBQVEsQ0FBQzJDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBLFFBQU1DLEtBQUssR0FBRyxFQUFkO0FBRUFGLEtBQUcsQ0FBQzFCLFNBQUosR0FBZ0JyQixJQUFJLENBQUNrRCxJQUFMLEVBQWhCOztBQUVBLFNBQU9ILEdBQUcsQ0FBQ0ksVUFBWCxFQUF1QjtBQUNyQkYsU0FBSyxDQUFDdEgsSUFBTixDQUFXLENBQUNtSCxNQUFNLElBQUl6QyxRQUFRLENBQUMrQyxJQUFwQixFQUEwQkMsV0FBMUIsQ0FBc0NOLEdBQUcsQ0FBQ0ksVUFBMUMsQ0FBWDtBQUNEOztBQUVELFNBQU9GLEtBQVA7QUFDRCxDQVhEOztBQWFBLE1BQU1wRCxNQUFNLEdBQUlJLEdBQUQsSUFBUztBQUN0QixRQUFNTSxLQUFLLEdBQUdGLFFBQVEsQ0FBQzJDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBZDtBQUVBekMsT0FBSyxDQUFDK0MsSUFBTixHQUFhLFVBQWI7O0FBRUEsTUFBSXJELEdBQUcsQ0FBQ3NELFVBQVIsRUFBb0I7QUFDbEJoRCxTQUFLLENBQUNnRCxVQUFOLENBQWlCQyxPQUFqQixHQUEyQnZELEdBQTNCO0FBQ0QsR0FGRCxNQUVPO0FBQ0xNLFNBQUssQ0FBQzhDLFdBQU4sQ0FBa0JoRCxRQUFRLENBQUNvRCxjQUFULENBQXdCeEQsR0FBeEIsQ0FBbEI7QUFDRCxHQVRxQixDQVd0Qjs7O0FBQ0FJLFVBQVEsQ0FBQ3FELElBQVQsQ0FBY0wsV0FBZCxDQUEwQjlDLEtBQTFCO0FBQ0QsQ0FiRDs7QUFlQSxNQUFNaUIsYUFBYSxHQUFHLENBQUM1RixNQUFELEVBQVNnQixPQUFULEtBQXFCO0FBQ3pDaEIsUUFBTSxDQUFDRixnQkFBUCxDQUF3QixTQUF4QixFQUFvQ3FDLE9BQUQsSUFBYTtBQUM5QyxVQUFNO0FBQUVDLFlBQUY7QUFBVUMsVUFBSSxHQUFHO0FBQWpCLFFBQXdCQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0osT0FBTyxDQUFDRSxJQUFuQixDQUE5QjtBQUNBckIsV0FBTyxDQUFDb0IsTUFBRCxFQUFTQyxJQUFULENBQVA7QUFDRCxHQUhEO0FBSUQsQ0FMRDs7QUFPQW5CLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUFFOEMsUUFBRjtBQUFVQyxTQUFWO0FBQW1CMEI7QUFBbkIsQ0FBakIsQyIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcImIzMjBiYTUtXCIgKyBjaHVua0lkICsgXCItd3BzLWhtci5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcImIzMjBiYTUtd3BzLWhtci5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJkOTkzMGIxZDQzMmNkZTM0OTkzYlwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkludmFsaWRhdGVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG4gXHRcdFx0aW52YWxpZGF0ZTogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHR0aGlzLl9zZWxmSW52YWxpZGF0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0c3dpdGNoIChob3RTdGF0dXMpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcImlkbGVcIjpcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJyZWFkeVwiOlxuIFx0XHRcdFx0XHRcdGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGUobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwicHJlcGFyZVwiOlxuIFx0XHRcdFx0XHRjYXNlIFwiY2hlY2tcIjpcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VcIjpcbiBcdFx0XHRcdFx0Y2FzZSBcImFwcGx5XCI6XG4gXHRcdFx0XHRcdFx0KGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9XG4gXHRcdFx0XHRcdFx0XHRob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgfHwgW10pLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdC8vIGlnbm9yZSByZXF1ZXN0cyBpbiBlcnJvciBzdGF0ZXNcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdH1cbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaCwgaG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKGhvdEFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkgPyBcInJlYWR5XCIgOiBcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwiYXBwXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiBcdFx0cmV0dXJuIGhvdEFwcGx5SW50ZXJuYWwob3B0aW9ucyk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5SW50ZXJuYWwob3B0aW9ucykge1xuIFx0XHRob3RBcHBseUludmFsaWRhdGVkTW9kdWxlcygpO1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdCFtb2R1bGUgfHxcbiBcdFx0XHRcdFx0KG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCAmJiAhbW9kdWxlLmhvdC5fc2VsZkludmFsaWRhdGVkKVxuIFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkICYmXG4gXHRcdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG4gXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSAhPT0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlICYmXG4gXHRcdFx0XHQvLyB3aGVuIGNhbGxlZCBpbnZhbGlkYXRlIHNlbGYtYWNjZXB0aW5nIGlzIG5vdCBwb3NzaWJsZVxuIFx0XHRcdFx0IWluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkludmFsaWRhdGVkXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdHBhcmVudHM6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLnBhcmVudHMuc2xpY2UoKSxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aWYgKGhvdFVwZGF0ZU5ld0hhc2ggIT09IHVuZGVmaW5lZCkge1xuIFx0XHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdW5kZWZpbmVkO1xuIFx0XHR9XG4gXHRcdGhvdFVwZGF0ZSA9IHVuZGVmaW5lZDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gaXRlbS5wYXJlbnRzO1xuIFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IG1vZHVsZUlkO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRpZiAoaG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG4gXHRcdFx0cmV0dXJuIGhvdEFwcGx5SW50ZXJuYWwob3B0aW9ucykudGhlbihmdW5jdGlvbihsaXN0KSB7XG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbihtb2R1bGVJZCkge1xuIFx0XHRcdFx0XHRpZiAobGlzdC5pbmRleE9mKG1vZHVsZUlkKSA8IDApIGxpc3QucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHJldHVybiBsaXN0O1xuIFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseUludmFsaWRhdGVkTW9kdWxlcygpIHtcbiBcdFx0aWYgKGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuIFx0XHRcdGlmICghaG90VXBkYXRlKSBob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMuZm9yRWFjaChob3RBcHBseUludmFsaWRhdGVkTW9kdWxlKTtcbiBcdFx0XHRob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgPSB1bmRlZmluZWQ7XG4gXHRcdFx0cmV0dXJuIHRydWU7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHRpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIG1vZHVsZUlkKSlcbiBcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9kdWxlc1ttb2R1bGVJZF07XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMCkoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuXG4vKipcbiAqIEBub3RlIFRoaXMgZmlsZSBleGlzdHMgbWVyZWx5IGFzIGFuIGVhc3kgcmVmZXJlbmNlIGZvciBmb2xrcyBhZGRpbmcgaXQgdG8gdGhlaXIgY29uZmlndXJhdGlvbiBlbnRyaWVzXG4gKi9cblxuKCgpID0+IHtcbiAgLyogZXNsaW50LWRpc2FibGUgZ2xvYmFsLXJlcXVpcmUgKi9cbiAgY29uc3QgeyBydW4gfSA9IHJlcXVpcmUoJy4vbGliL2NsaWVudC9jbGllbnQnKTtcbiAgbGV0IGhhc2ggPSAnPHVua25vd24+JztcbiAgbGV0IG9wdGlvbnM7XG4gIHRyeSB7XG4gICAgb3B0aW9ucyA9IMqOyZDJucmUb3PHncqMybnHnXM7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zdCB7IGxvZyB9ID0gcmVxdWlyZSgnLi9saWIvY2xpZW50L2xvZycpO1xuICAgIGxvZy5lcnJvcihcbiAgICAgICdUaGUgZW50cnkgZm9yIHdlYnBhY2stcGx1Z2luLXNlcnZlIHdhcyBpbmNsdWRlZCBpbiB5b3VyIGJ1aWxkLCBidXQgaXQgZG9lcyBub3QgYXBwZWFyIHRoYXQgdGhlIHBsdWdpbiB3YXMuIFBsZWFzZSBjaGVjayB5b3VyIGNvbmZpZ3VyYXRpb24uJ1xuICAgICk7XG4gIH1cblxuICB0cnkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICBoYXNoID0gX193ZWJwYWNrX2hhc2hfXztcbiAgfSBjYXRjaCAoZSkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lbXB0eVxuXG4gIHJ1bihoYXNoLCBvcHRpb25zKTtcbn0pKCk7XG4iLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyBlcnJvciwgcmVmcmVzaCwgd2FybiB9ID0gcmVxdWlyZSgnLi9sb2cnKSgpO1xuXG4vLyBpZ25vcmUgMTAwOCAoSFRUUCA0MDAgZXF1aXZhbGVudCkgYW5kIDEwMTEgKEhUVFAgNTAwIGVxdWl2YWxlbnQpXG5jb25zdCBpZ25vcmVDb2RlcyA9IFsxMDA4LCAxMDExXTtcbmNvbnN0IG1heEF0dGVtcHRzID0gMTA7XG5cbmNsYXNzIENsaWVudFNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMsIC4uLmFyZ3MpIHtcbiAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgIHRoaXMuYXR0ZW1wdHMgPSAwO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVycyA9IFtdO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5yZXRyeWluZyA9IGZhbHNlO1xuXG4gICAgdGhpcy5jb25uZWN0KCk7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKC4uLmFyZ3MpIHtcbiAgICB0aGlzLmV2ZW50SGFuZGxlcnMucHVzaChhcmdzKTtcbiAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKC4uLmFyZ3MpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5zb2NrZXQuY2xvc2UoKTtcbiAgfVxuXG4gIGNvbm5lY3QoKSB7XG4gICAgaWYgKHRoaXMuc29ja2V0KSB7XG4gICAgICBkZWxldGUgdGhpcy5zb2NrZXQ7XG4gICAgfVxuXG4gICAgdGhpcy5jb25uZWN0aW5nID0gdHJ1ZTtcblxuICAgIHRoaXMuc29ja2V0ID0gbmV3IFdlYlNvY2tldCguLi50aGlzLmFyZ3MpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZXRyeSkge1xuICAgICAgdGhpcy5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGlnbm9yZUNvZGVzLmluY2x1ZGVzKGV2ZW50LmNvZGUpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnJldHJ5aW5nKSB7XG4gICAgICAgICAgd2FybihgVGhlIFdlYlNvY2tldCB3YXMgY2xvc2VkIGFuZCB3aWxsIGF0dGVtcHQgdG8gcmVjb25uZWN0YCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlY29ubmVjdCgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc29ja2V0Lm9uY2xvc2UgPSAoKSA9PiB3YXJuKGBUaGUgY2xpZW50IFdlYlNvY2tldCB3YXMgY2xvc2VkLiAke3JlZnJlc2h9YCk7XG4gICAgfVxuXG4gICAgdGhpcy5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsICgpID0+IHtcbiAgICAgIHRoaXMuYXR0ZW1wdHMgPSAwO1xuICAgICAgdGhpcy5yZXRyeWluZyA9IGZhbHNlO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuZXZlbnRIYW5kbGVycy5sZW5ndGgpIHtcbiAgICAgIGZvciAoY29uc3QgW25hbWUsIGZuXSBvZiB0aGlzLmV2ZW50SGFuZGxlcnMpIHtcbiAgICAgICAgdGhpcy5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVjb25uZWN0KCkge1xuICAgIHRoaXMuYXR0ZW1wdHMgKz0gMTtcbiAgICB0aGlzLnJldHJ5aW5nID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLmF0dGVtcHRzID4gbWF4QXR0ZW1wdHMpIHtcbiAgICAgIGVycm9yKGBUaGUgV2ViU29ja2V0IGNvdWxkIG5vdCBiZSByZWNvbm5lY3RlZC4gJHtyZWZyZXNofWApO1xuICAgICAgdGhpcy5yZXRyeWluZyA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRpbWVvdXQgPSAxMDAwICogdGhpcy5hdHRlbXB0cyAqKiAyO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNvbm5lY3QodGhpcy5hcmdzKSwgdGltZW91dCk7XG4gIH1cblxuICByZW1vdmVFdmVudExpc3RlbmVyKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBbLCBoYW5kbGVyXSA9IGFyZ3M7XG4gICAgdGhpcy5ldmVudEhhbmRsZXJzID0gdGhpcy5ldmVudEhhbmRsZXJzLmZpbHRlcigoWywgZm5dKSA9PiBmbiA9PT0gaGFuZGxlcik7XG4gICAgdGhpcy5zb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lciguLi5hcmdzKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgQ2xpZW50U29ja2V0IH07XG4iLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuLyogZXNsaW50LWRpc2FibGUgZ2xvYmFsLXJlcXVpcmUgKi9cbmNvbnN0IHJ1biA9IChidWlsZEhhc2gsIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgeyBhZGRyZXNzLCBjbGllbnQgPSB7fSwgcHJvZ3Jlc3MsIHNlY3VyZSwgc3RhdHVzIH0gPSBvcHRpb25zO1xuXG4gIG9wdGlvbnMuZmlyc3RJbnN0YW5jZSA9ICF3aW5kb3cud2VicGFja1BsdWdpblNlcnZlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cbiAgd2luZG93LndlYnBhY2tQbHVnaW5TZXJ2ZSA9IHdpbmRvdy53ZWJwYWNrUGx1Z2luU2VydmUgfHwge1xuICAgIGNvbXBpbGVyczoge31cbiAgfTtcbiAgd2luZG93LndlYnBhY2tQbHVnaW5TZXJ2ZS5zaWxlbnQgPSAhIWNsaWVudC5zaWxlbnQ7XG5cbiAgY29uc3QgeyBDbGllbnRTb2NrZXQgfSA9IHJlcXVpcmUoJy4vQ2xpZW50U29ja2V0Jyk7XG4gIGNvbnN0IHsgcmVwbGFjZSB9ID0gcmVxdWlyZSgnLi9obXInKTtcbiAgY29uc3QgeyBlcnJvciwgaW5mbywgd2FybiB9ID0gcmVxdWlyZSgnLi9sb2cnKSgpO1xuXG4gIGNvbnN0IHByb3RvY29sID0gc2VjdXJlID8gJ3dzcycgOiAnd3MnO1xuICBjb25zdCBzb2NrZXQgPSBuZXcgQ2xpZW50U29ja2V0KGNsaWVudCwgYCR7cHJvdG9jb2x9Oi8vJHtjbGllbnQuYWRkcmVzcyB8fCBhZGRyZXNzfS93cHNgKTtcblxuICBjb25zdCB7IGNvbXBpbGVyTmFtZSB9ID0gb3B0aW9ucztcblxuICB3aW5kb3cud2VicGFja1BsdWdpblNlcnZlLmNvbXBpbGVyc1tjb21waWxlck5hbWVdID0ge307XG5cbiAgLy8gcHJldmVudHMgRUNPTk5SRVNFVCBlcnJvcnMgb24gdGhlIHNlcnZlclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKCkgPT4gc29ja2V0LmNsb3NlKCkpO1xuXG4gIHNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCB7IGFjdGlvbiwgZGF0YSA9IHt9IH0gPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XG4gICAgY29uc3QgeyBlcnJvcnMsIGhhc2ggPSAnPD8+Jywgd2FybmluZ3MgfSA9IGRhdGEgfHwge307XG4gICAgY29uc3Qgc2hvcnRIYXNoID0gaGFzaC5zbGljZSgwLCA3KTtcbiAgICBjb25zdCBpZGVudGlmaWVyID0gb3B0aW9ucy5jb21waWxlck5hbWUgPyBgKENvbXBpbGVyOiAke29wdGlvbnMuY29tcGlsZXJOYW1lfSkgYCA6ICcnO1xuICAgIGNvbnN0IGNvbXBpbGVyID0gd2luZG93LndlYnBhY2tQbHVnaW5TZXJ2ZS5jb21waWxlcnNbY29tcGlsZXJOYW1lXTtcbiAgICBjb25zdCB7IHdwc0lkIH0gPSBkYXRhO1xuXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgJ2J1aWxkJzpcbiAgICAgICAgY29tcGlsZXIuZG9uZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Nvbm5lY3RlZCc6XG4gICAgICAgIGluZm8oYFdlYlNvY2tldCBjb25uZWN0ZWQgJHtpZGVudGlmaWVyfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RvbmUnOlxuICAgICAgICBjb21waWxlci5kb25lID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwcm9ibGVtcyc6XG4gICAgICAgIGlmIChkYXRhLmVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICBlcnJvcihgJHtpZGVudGlmaWVyfUJ1aWxkICR7c2hvcnRIYXNofSBwcm9kdWNlZCBlcnJvcnM6XFxuYCwgZXJyb3JzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS53YXJuaW5ncy5sZW5ndGgpIHtcbiAgICAgICAgICB3YXJuKGAke2lkZW50aWZpZXJ9QnVpbGQgJHtzaG9ydEhhc2h9IHByb2R1Y2VkIHdhcm5pbmdzOlxcbmAsIHdhcm5pbmdzKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JlbG9hZCc6XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgLy8gYWN0aW9ucyB3aXRoIGEgd3BzSWQgaW4gdG93IGluZGljYXRlIGFjdGlvbnMgdGhhdCBzaG91bGQgb25seSBiZSBleGVjdXRlZCB3aGVuIHRoZSB3cHNJZCBzZW50XG4gICAgICAgIC8vIG1hdGNoZXMgdGhlIHdwc0lkIHNldCBpbiBvcHRpb25zLiB0aGlzIGlzIGhvdyB3ZSBjYW4gaWRlbnRpZnkgbXVsdGlwbGUgY29tcGlsZXJzIGluIHRoZVxuICAgICAgICAvLyBjbGllbnQuXG4gICAgICAgIGlmICh3cHNJZCAmJiB3cHNJZCA9PT0gb3B0aW9ucy53cHNJZCkge1xuICAgICAgICAgIHJlcGxhY2UoYnVpbGRIYXNoLCBoYXNoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICB9KTtcblxuICBpZiAob3B0aW9ucy5maXJzdEluc3RhbmNlKSB7XG4gICAgaWYgKHByb2dyZXNzID09PSAnbWluaW1hbCcpIHtcbiAgICAgIGNvbnN0IHsgaW5pdCB9ID0gcmVxdWlyZSgnLi9vdmVybGF5cy9wcm9ncmVzcy1taW5pbWFsJyk7XG4gICAgICBpbml0KG9wdGlvbnMsIHNvY2tldCk7XG4gICAgfSBlbHNlIGlmIChwcm9ncmVzcykge1xuICAgICAgY29uc3QgeyBpbml0IH0gPSByZXF1aXJlKCcuL292ZXJsYXlzL3Byb2dyZXNzJyk7XG4gICAgICBpbml0KG9wdGlvbnMsIHNvY2tldCk7XG4gICAgfVxuXG4gICAgaWYgKHN0YXR1cykge1xuICAgICAgY29uc3QgeyBpbml0IH0gPSByZXF1aXJlKCcuL292ZXJsYXlzL3N0YXR1cycpO1xuICAgICAgaW5pdChvcHRpb25zLCBzb2NrZXQpO1xuICAgIH1cblxuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICBpbmZvKCdIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGlzIGFjdGl2ZScpO1xuXG4gICAgICBpZiAob3B0aW9ucy5saXZlUmVsb2FkKSB7XG4gICAgICAgIGluZm8oJ0xpdmUgUmVsb2FkIHRha2luZyBwcmVjZWRlbmNlIG92ZXIgSG90IE1vZHVsZSBSZXBsYWNlbWVudCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB3YXJuKCdIb3QgTW9kdWxlIFJlcGxhY2VtZW50IGlzIGluYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgaWYgKCFtb2R1bGUuaG90ICYmIG9wdGlvbnMubGl2ZVJlbG9hZCkge1xuICAgICAgaW5mbygnTGl2ZSBSZWxvYWQgaXMgYWN0aXZlJyk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgcnVuIH07XG4iLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyBlcnJvciwgaW5mbywgcmVmcmVzaCwgd2FybiB9ID0gcmVxdWlyZSgnLi9sb2cnKSgpO1xuXG5sZXQgbGF0ZXN0ID0gdHJ1ZTtcblxuY29uc3QgaG1yID0ge1xuICBvblVuYWNjZXB0ZWQoZGF0YSkge1xuICAgIHdhcm4oJ0NoYW5nZSBpbiB1bmFjY2VwdGVkIG1vZHVsZShzKTpcXG4nLCBkYXRhKTtcbiAgICB3YXJuKGRhdGEpO1xuICB9LFxuICBvbkRlY2xpbmVkKGRhdGEpIHtcbiAgICB3YXJuKCdDaGFuZ2UgaW4gZGVjbGluZWQgbW9kdWxlKHMpOlxcbicsIGRhdGEpO1xuICB9LFxuICBvbkVycm9yZWQoZGF0YSkge1xuICAgIGVycm9yKCdFcnJvciBpbiBtb2R1bGUocyk6XFxuJywgZGF0YSk7XG4gIH1cbn07XG5cbmNvbnN0IHJlcGxhY2UgPSBhc3luYyAoYnVpbGRIYXNoLCBoYXNoKSA9PiB7XG4gIGNvbnN0IHsgYXBwbHksIGNoZWNrLCBzdGF0dXMgfSA9IG1vZHVsZS5ob3Q7XG5cbiAgaWYgKGhhc2gpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICBsYXRlc3QgPSBoYXNoLmluY2x1ZGVzKGJ1aWxkSGFzaCk7XG4gIH1cblxuICBpZiAoIWxhdGVzdCkge1xuICAgIGNvbnN0IGhtclN0YXR1cyA9IHN0YXR1cygpO1xuXG4gICAgaWYgKGhtclN0YXR1cyA9PT0gJ2Fib3J0JyB8fCBobXJTdGF0dXMgPT09ICdmYWlsJykge1xuICAgICAgd2FybihgQW4gSE1SIHVwZGF0ZSB3YXMgdHJpZ2dlcmVkLCBidXQgJHtobXJTdGF0dXN9ZWQuICR7cmVmcmVzaH1gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbW9kdWxlcztcblxuICAgIHRyeSB7XG4gICAgICBtb2R1bGVzID0gYXdhaXQgY2hlY2soZmFsc2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIG5vb3AuIHRoaXMgdHlwaWNhbGx5IGhhcHBlbnMgd2hlbiBhIE11bHRpQ29tcGlsZXIgaGFzIG1vcmUgdGhhbiBvbmUgY29tcGlsZXIgdGhhdCBpbmNsdWRlc1xuICAgICAgLy8gdGhpcyBzY3JpcHQsIGFuZCBhbiB1cGRhdGUgaGFwcGVucyB3aXRoIGEgaGFzaCB0aGF0IGlzbid0IHBhcnQgb2YgdGhlIGNvbXBpbGVyL21vZHVsZSB0aGlzXG4gICAgICAvLyBpbnN0YW5jZSB3YXMgbG9hZGVkIGZvci5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIW1vZHVsZXMpIHtcbiAgICAgIHdhcm4oYE5vIG1vZHVsZXMgZm91bmQgZm9yIHJlcGxhY2VtZW50LiAke3JlZnJlc2h9YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbW9kdWxlcyA9IGF3YWl0IGFwcGx5KGhtcik7XG5cbiAgICBpZiAobW9kdWxlcykge1xuICAgICAgbGF0ZXN0ID0gdHJ1ZTtcbiAgICAgIGluZm8oYEJ1aWxkICR7aGFzaC5zbGljZSgwLCA3KX0gcmVwbGFjZWQ6XFxuYCwgbW9kdWxlcyk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVwbGFjZSB9O1xuIiwiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IHsgZXJyb3IsIGluZm8sIHdhcm4gfSA9IGNvbnNvbGU7XG5jb25zdCBsb2cgPSB7XG4gIGVycm9yOiBlcnJvci5iaW5kKGNvbnNvbGUsICfirKEgd3BzOicpLFxuICBpbmZvOiBpbmZvLmJpbmQoY29uc29sZSwgJ+KsoSB3cHM6JyksXG4gIHJlZnJlc2g6ICdQbGVhc2UgcmVmcmVzaCB0aGUgcGFnZScsXG4gIHdhcm46IHdhcm4uYmluZChjb25zb2xlLCAn4qyhIHdwczonKVxufTtcbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcbmNvbnN0IHNpbGVudCA9IHtcbiAgZXJyb3I6IG5vb3AsXG4gIGluZm86IG5vb3AsXG4gIHdhcm46IG5vb3Bcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4gKHdpbmRvdy53ZWJwYWNrUGx1Z2luU2VydmUuc2lsZW50ID8gc2lsZW50IDogbG9nKTtcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGwsIE1hdGhldXMgR29uw6dhbHZlcyBkYSBTaWx2YVxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IHsgYWRkQ3NzLCBhZGRIdG1sIH0gPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuY29uc3QgbnMgPSAnd3BzLXByb2dyZXNzLW1pbmltYWwnO1xuY29uc3QgaHRtbCA9IGBcbjxkaXYgaWQ9XCIke25zfVwiIGNsYXNzPVwiJHtuc30taGlkZGVuXCI+XG4gIDxkaXYgaWQ9XCIke25zfS1iYXJcIj48L2Rpdj5cbjwvZGl2PlxuYDtcbmNvbnN0IGNzcyA9IGBcbiMke25zfSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBoZWlnaHQ6IDRweDtcbiAgd2lkdGg6IDEwMHZ3O1xuICB6LWluZGV4OiAyMTQ3NDgzNjQ1O1xufVxuXG4jJHtuc30tYmFyIHtcbiAgd2lkdGg6IDAlO1xuICBoZWlnaHQ6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4NiwgMjIzLCAxNzIpO1xuICB0cmFuc2l0aW9uOiB3aWR0aCAxcyBlYXNlLWluLW91dDtcbn1cblxuLiR7bnN9LWhpZGRlbntcbiAgZGlzcGxheTogbm9uZTtcbn1cbmA7XG5cbmNvbnN0IHVwZGF0ZSA9IChwZXJjZW50KSA9PiB7XG4gIGNvbnN0IGJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1iYXJgKTtcbiAgYmFyLnN0eWxlLndpZHRoID0gYCR7cGVyY2VudH0lYDtcbn07XG5cbmNvbnN0IHJlc2V0ID0gKHdyYXBwZXIpID0+IHtcbiAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKGAke25zfS1oaWRkZW5gKTtcbiAgc2V0VGltZW91dCgoKSA9PiB1cGRhdGUoMCksIDFlMyk7XG59O1xuXG5jb25zdCBpbml0ID0gKG9wdGlvbnMsIHNvY2tldCkgPT4ge1xuICBpZiAob3B0aW9ucy5maXJzdEluc3RhbmNlKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgIGFkZENzcyhjc3MpO1xuICAgICAgYWRkSHRtbChodG1sKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCB7IGFjdGlvbiwgZGF0YSB9ID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuXG4gICAgaWYgKGFjdGlvbiAhPT0gJ3Byb2dyZXNzJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBlcmNlbnQgPSBNYXRoLmZsb29yKGRhdGEucGVyY2VudCAqIDEwMCk7XG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfWApO1xuXG4gICAgd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKGAke25zfS1oaWRkZW5gKTtcblxuICAgIGlmIChkYXRhLnBlcmNlbnQgPT09IDEpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVzZXQod3JhcHBlciksIDVlMyk7XG4gICAgfVxuXG4gICAgdXBkYXRlKHBlcmNlbnQpO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0XG59O1xuIiwiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbCwgTWF0aGV1cyBHb27Dp2FsdmVzIGRhIFNpbHZhXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyBhZGRDc3MsIGFkZEh0bWwgfSA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5jb25zdCBucyA9ICd3cHMtcHJvZ3Jlc3MnO1xuY29uc3QgY3NzID0gYFxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnM6NDAwLDcwMCcpO1xuXG4jJHtuc317XG4gIHdpZHRoOiAyMDBweDtcbiAgaGVpZ2h0OiAyMDBweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogNSU7XG4gIHRvcDogNSU7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgLjI1cyBlYXNlLWluLW91dDtcbiAgei1pbmRleDogMjE0NzQ4MzY0NTtcbn1cblxuIyR7bnN9LWJnIHtcbiAgZmlsbDogIzI4MmQzNTtcbn1cblxuIyR7bnN9LWZpbGwge1xuICBmaWxsOiByZ2JhKDAsIDAsIDAsIDApO1xuICBzdHJva2U6IHJnYigxODYsIDIyMywgMTcyKTtcbiAgc3Ryb2tlLWRhc2hhcnJheTogMjE5Ljk5MDc4MzY5MTQwNjI1O1xuICBzdHJva2UtZGFzaG9mZnNldDogLTIxOS45OTA3ODM2OTE0MDYyNTtcbiAgc3Ryb2tlLXdpZHRoOiAxMDtcbiAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpdHJhbnNsYXRlKDBweCwgLTgwcHgpO1xuICB0cmFuc2l0aW9uOiBzdHJva2UtZGFzaG9mZnNldCAxcztcbn1cblxuIyR7bnN9LXBlcmNlbnQge1xuICBmb250LWZhbWlseTogJ09wZW4gU2Fucyc7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZmlsbDogI2ZmZmZmZjtcbn1cblxuIyR7bnN9LXBlcmNlbnQtdmFsdWUge1xuICBkb21pbmFudC1iYXNlbGluZTogbWlkZGxlO1xuICB0ZXh0LWFuY2hvcjogbWlkZGxlO1xufVxuXG4jJHtuc30tcGVyY2VudC1zdXBlciB7XG4gIGZpbGw6ICNiZGMzYzc7XG4gIGZvbnQtc2l6ZTogLjQ1ZW07XG4gIGJhc2VsaW5lLXNoaWZ0OiAxMCU7XG59XG5cbi4ke25zfS1ub3NlbGVjdCB7XG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbkBrZXlmcmFtZXMgJHtuc30taGlkZGVuLWRpc3BsYXkge1xuXHQwJSB7XG5cdFx0b3BhY2l0eTogMTtcblx0XHR0cmFuc2Zvcm06IHNjYWxlKDEpO1xuXHRcdC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcblx0fVxuXHQ5OSUge1xuXHRcdGRpc3BsYXk6IGlubGluZS1mbGV4O1xuXHRcdG9wYWNpdHk6IDA7XG5cdFx0dHJhbnNmb3JtOiBzY2FsZSgwKTtcblx0XHQtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XG5cdH1cblx0MTAwJSB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0XHRvcGFjaXR5OiAwO1xuXHRcdHRyYW5zZm9ybTogc2NhbGUoMCk7XG5cdFx0LXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xuXHR9XG59XG5cbi4ke25zfS1oaWRkZW4ge1xuICBhbmltYXRpb246ICR7bnN9LWhpZGRlbi1kaXNwbGF5IC4zcztcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTpmb3J3YXJkcztcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG59XG5cbi4ke25zfS1oaWRkZW4tb25sb2FkIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbmA7XG5cbmNvbnN0IGh0bWwgPSBgXG48c3ZnIGlkPVwiJHtuc31cIiBjbGFzcz1cIiR7bnN9LW5vc2VsZWN0ICR7bnN9LWhpZGRlbi1vbmxvYWRcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHZpZXdCb3g9XCIwIDAgODAgODBcIj5cbiAgPGNpcmNsZSBpZD1cIiR7bnN9LWJnXCIgY3g9XCI1MCVcIiBjeT1cIjUwJVwiIHI9XCIzNVwiPjwvY2lyY2xlPlxuICA8cGF0aCBpZD1cIiR7bnN9LWZpbGxcIiBkPVwiTTUsNDBhMzUsMzUgMCAxLDAgNzAsMGEzNSwzNSAwIDEsMCAtNzAsMFwiIC8+XG4gIDx0ZXh0IGlkPVwiJHtuc30tcGVyY2VudFwiIHg9XCI1MCVcIiB5PVwiNTElXCI+PHRzcGFuIGlkPVwiJHtuc30tcGVyY2VudC12YWx1ZVwiPjA8L3RzcGFuPjx0c3BhbiBpZD1cIiR7bnN9LXBlcmNlbnQtc3VwZXJcIj4lPC90c3Bhbj48L3RleHQ+XG48L3N2Zz5cbmA7XG5cbmNvbnN0IHVwZGF0ZSA9IChwZXJjZW50KSA9PiB7XG4gIGNvbnN0IG1heCA9IC0yMTkuOTkwNzgzNjkxNDA2MjU7XG4gIGNvbnN0IHZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LXBlcmNlbnQtdmFsdWVgKTtcbiAgY29uc3QgdHJhY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tZmlsbGApO1xuICBjb25zdCBvZmZzZXQgPSAoKDEwMCAtIHBlcmNlbnQpIC8gMTAwKSAqIG1heDtcblxuICB0cmFjay5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYHN0cm9rZS1kYXNob2Zmc2V0OiAke29mZnNldH1gKTtcbiAgdmFsdWUuaW5uZXJIVE1MID0gcGVyY2VudC50b1N0cmluZygpO1xufTtcblxuY29uc3QgcmVzZXQgPSAoc3ZnKSA9PiB7XG4gIHN2Zy5jbGFzc0xpc3QuYWRkKGAke25zfS1oaWRkZW5gKTtcbiAgc2V0VGltZW91dCgoKSA9PiB1cGRhdGUoMCksIDFlMyk7XG59O1xuXG5jb25zdCBpbml0ID0gKG9wdGlvbnMsIHNvY2tldCkgPT4ge1xuICBpZiAob3B0aW9ucy5maXJzdEluc3RhbmNlKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgIGFkZENzcyhjc3MpO1xuICAgICAgYWRkSHRtbChodG1sKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCB7IGFjdGlvbiwgZGF0YSB9ID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuXG4gICAgaWYgKGFjdGlvbiAhPT0gJ3Byb2dyZXNzJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBlcmNlbnQgPSBNYXRoLmZsb29yKGRhdGEucGVyY2VudCAqIDEwMCk7XG4gICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9YCk7XG5cbiAgICBpZiAoIXN2Zykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHdlIGNhbiBzYWZlbHkgY2FsbCB0aGlzIGV2ZW4gaWYgaXQgZG9lc24ndCBoYXZlIHRoZSBjbGFzc1xuICAgIHN2Zy5jbGFzc0xpc3QucmVtb3ZlKGAke25zfS1oaWRkZW5gLCBgJHtuc30taGlkZGVuLW9ubG9hZGApO1xuXG4gICAgaWYgKGRhdGEucGVyY2VudCA9PT0gMSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiByZXNldChzdmcpLCA1ZTMpO1xuICAgIH1cblxuICAgIHVwZGF0ZShwZXJjZW50KTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgaW5pdCB9O1xuIiwiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IHsgYWRkQ3NzLCBhZGRIdG1sLCBzb2NrZXRNZXNzYWdlIH0gPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuY29uc3QgbnMgPSAnd3BzLXN0YXR1cyc7XG5jb25zdCBjc3MgPSBgXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU9wZW4rU2Fuczo0MDAsNzAwJyk7XG5cbiMke25zfSB7XG4gIGJhY2tncm91bmQ6ICMyODJkMzU7XG4gIGJvcmRlci1yYWRpdXM6IDAuNmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHRmb250LWZhbWlseTogJ09wZW4gU2FucycsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XG5cdGZvbnQtc2l6ZTogMTBweDtcbiAgaGVpZ2h0OiA5MCU7XG4gIG1pbi1oZWlnaHQ6IDIwZW07XG4gIGxlZnQ6IDUwJTtcbiAgb3BhY2l0eTogMTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcGFkZGluZy1ib3R0b206IDNlbTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDJyZW07XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMjVzIGVhc2UtaW4tb3V0O1xuICB3aWR0aDogOTUlO1xuICB6LWluZGV4OiAyMTQ3NDgzNjQ1O1xufVxuXG5Aa2V5ZnJhbWVzICR7bnN9LWhpZGRlbi1kaXNwbGF5IHtcblx0MCUge1xuXHRcdG9wYWNpdHk6IDE7XG5cdH1cblx0OTklIHtcblx0XHRkaXNwbGF5OiBpbmxpbmUtZmxleDtcblx0XHRvcGFjaXR5OiAwO1xuXHR9XG5cdDEwMCUge1xuXHRcdGRpc3BsYXk6IG5vbmU7XG5cdFx0b3BhY2l0eTogMDtcblx0fVxufVxuXG4jJHtuc30uJHtuc30taGlkZGVuIHtcbiAgYW5pbWF0aW9uOiAke25zfS1oaWRkZW4tZGlzcGxheSAuM3M7XG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6Zm9yd2FyZHM7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbiMke25zfS4ke25zfS1taW4ge1xuICBhbmltYXRpb246IG1pbmltaXplIDEwcztcbiAgYm90dG9tOiAyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgaGVpZ2h0OiA2ZW07XG4gIGxlZnQ6IGF1dG87XG4gIG1pbi1oZWlnaHQ6IDZlbTtcbiAgcGFkZGluZy1ib3R0b206IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDJlbTtcbiAgdG9wOiBhdXRvO1xuICB0cmFuc2Zvcm06IG5vbmU7XG4gIHdpZHRoOiA2ZW07XG59XG5cbiMke25zfS4ke25zfS1taW4gIyR7bnN9LWJlYWNvbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4jJHtuc30tdGl0bGUge1xuICBjb2xvcjogI2ZmZjtcbiAgZm9udC1zaXplOiAxLjJlbTtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwLjZlbSAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4jJHtuc30uJHtuc30tbWluICMke25zfS10aXRsZSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbiMke25zfS10aXRsZS1lcnJvcnMge1xuICBjb2xvcjogI2ZmNWY1ODtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBwYWRkaW5nLWxlZnQ6IDFlbTtcbn1cblxuIyR7bnN9LXRpdGxlLXdhcm5pbmdzIHtcbiAgY29sb3I6ICNmZmJkMmU7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgcGFkZGluZy1sZWZ0OiAxZW07XG59XG5cbiMke25zfS1wcm9ibGVtcyB7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIHBhZGRpbmc6IDFlbSAyZW07XG59XG5cbiMke25zfS1wcm9ibGVtcyBwcmUge1xuICBjb2xvcjogI2RkZDtcbiAgYmFja2dyb3VuZDogIzI4MmQzNTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtc2l6ZTogMS4zZW07XG5cdGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xufVxuXG4jJHtuc30tcHJvYmxlbXMgcHJlIGVtIHtcbiAgYmFja2dyb3VuZDogI2ZmNWY1ODtcbiAgYm9yZGVyLXJhZGl1czogMC4zZW07XG4gIGNvbG9yOiAjNjQxZTE2O1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGxpbmUtaGVpZ2h0OiAzZW07XG4gIG1hcmdpbi1yaWdodDogMC40ZW07XG4gIHBhZGRpbmc6IDAuMWVtIDAuNGVtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG5wcmUjJHtuc30td2FybmluZ3MgZW0ge1xuICBiYWNrZ3JvdW5kOiAjZmZiZDJlO1xuICBjb2xvcjogIzNlMjcyMztcbn1cblxucHJlIyR7bnN9LXN1Y2Nlc3Mge1xuICBkaXNwbGF5OiBub25lO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbnByZSMke25zfS1zdWNjZXNzIGVtIHtcbiAgYmFja2dyb3VuZDogIzdmYjkwMDtcbiAgY29sb3I6ICMwMDRkNDA7XG59XG5cbiMke25zfS1wcm9ibGVtcy4ke25zfS1zdWNjZXNzICMke25zfS1zdWNjZXNzIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbiMke25zfS4ke25zfS1taW4gIyR7bnN9LXByb2JsZW1zIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuIyR7bnN9LW5hdiB7XG4gIG9wYWNpdHk6IDAuNTtcbiAgcGFkZGluZzogMS4yZW07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiAjJHtuc30tbmF2IHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuIyR7bnN9LW5hdjpob3ZlciB7XG4gIG9wYWNpdHk6IDE7XG59XG5cbiMke25zfS1uYXYgZGl2IHtcbiAgYmFja2dyb3VuZDogI2ZmNWY1ODtcbiAgYm9yZGVyLXJhZGl1czogMS4yZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBoZWlnaHQ6IDEuMmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxLjJlbTtcbn1cblxuZGl2IyR7bnN9LW1pbiB7XG4gIGJhY2tncm91bmQ6ICNmZmJkMmU7XG4gIG1hcmdpbi1sZWZ0OiAwLjhlbTtcbn1cblxuIyR7bnN9LWJlYWNvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDNlbTtcbiAgZGlzcGxheTogbm9uZTtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBoZWlnaHQ6IDNlbTtcbiAgbWFyZ2luOiAxLjZlbSBhdXRvO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAzZW07XG59XG5cbiMke25zfS1iZWFjb246YmVmb3JlLCAjJHtuc30tYmVhY29uOmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDEyNywxODUsMCwgMC4yKTtcbiAgYm9yZGVyLXJhZGl1czogM2VtO1xuICBvcGFjaXR5OiAwO1xufVxuXG4jJHtuc30tYmVhY29uOmJlZm9yZSB7XG4gIGFuaW1hdGlvbjogJHtuc30tcHVsc2UgM3MgaW5maW5pdGUgbGluZWFyO1xuICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xufVxuXG4jJHtuc30tYmVhY29uOmFmdGVyIHtcbiAgYW5pbWF0aW9uOiAke25zfS1wdWxzZSAzcyAycyBpbmZpbml0ZSBsaW5lYXI7XG59XG5cblxuQGtleWZyYW1lcyAke25zfS1wdWxzZSB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC42KTtcbiAgfVxuICAzMyUge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgfVxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KTtcbiAgfVxufVxuXG4jJHtuc30tYmVhY29uIG1hcmsge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDEyNywgMTg1LCAwLCAxKTtcbiAgYm9yZGVyLXJhZGl1czogMTAwJSAxMDAlO1xuICBoZWlnaHQ6IDFlbTtcbiAgbGVmdDogMWVtO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMWVtO1xuICB3aWR0aDogMWVtO1xufVxuXG4jJHtuc30tYmVhY29uLiR7bnN9LWVycm9yIG1hcmsge1xuICBiYWNrZ3JvdW5kOiAjZmY1ZjU4O1xufVxuXG4jJHtuc30tYmVhY29uLiR7bnN9LWVycm9yOmJlZm9yZSwgIyR7bnN9LWJlYWNvbi5lcnJvcjphZnRlciB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCA5NSwgODgsIDAuMik7XG59XG5cbiMke25zfS1iZWFjb24uJHtuc30td2FybmluZyBtYXJrIHtcbiAgYmFja2dyb3VuZDogI2ZmYmQyZTtcbn1cblxuIyR7bnN9LWJlYWNvbi4ke25zfS13YXJuaW5nOmJlZm9yZSwgIyR7bnN9LWJlYWNvbi53YXJuaW5nOmFmdGVyIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDE4OSwgNDYsIDAuMik7XG59XG5gO1xuXG5jb25zdCBodG1sID0gYFxuPGFzaWRlIGlkPVwiJHtuc31cIiBjbGFzcz1cIiR7bnN9LWhpZGRlblwiIHRpdGxlPVwiYnVpbGQgc3RhdHVzXCI+XG4gIDxmaWd1cmUgaWQ9XCIke25zfS1iZWFjb25cIj5cbiAgICA8bWFyay8+XG4gIDwvZmlndXJlPlxuICA8bmF2IGlkPVwiJHtuc30tbmF2XCI+XG4gICAgPGRpdiBpZD1cIiR7bnN9LWNsb3NlXCIgdGl0bGU9XCJjbG9zZVwiPjwvZGl2PlxuICAgIDxkaXYgaWQ9XCIke25zfS1taW5cIiB0aXRsZT1cIm1pbm1pemVcIj48L2Rpdj5cbiAgPC9uYXY+XG4gIDxoMSBpZD1cIiR7bnN9LXRpdGxlXCI+XG4gICAgYnVpbGQgc3RhdHVzXG4gICAgPGVtIGlkPVwiJHtuc30tdGl0bGUtZXJyb3JzXCI+PC9lbT5cbiAgICA8ZW0gaWQ9XCIke25zfS10aXRsZS13YXJuaW5nc1wiPjwvZW0+XG4gIDwvaDE+XG4gIDxhcnRpY2xlIGlkPVwiJHtuc30tcHJvYmxlbXNcIj5cbiAgICA8cHJlIGlkPVwiJHtuc30tc3VjY2Vzc1wiPjxlbT5CdWlsZCBTdWNjZXNzZnVsPC9lbT48L3ByZT5cbiAgICA8cHJlIGlkPVwiJHtuc30tZXJyb3JzXCI+PC9wcmU+XG4gICAgPHByZSBpZD1cIiR7bnN9LXdhcm5pbmdzXCI+PC9wcmU+XG4gIDwvYXJ0aWNsZT5cbjwvYXNpZGU+XG5gO1xuXG5jb25zdCBpbml0ID0gKG9wdGlvbnMsIHNvY2tldCkgPT4ge1xuICBjb25zdCBoaWRkZW4gPSBgJHtuc30taGlkZGVuYDtcbiAgbGV0IGhhc1Byb2JsZW1zID0gZmFsc2U7XG4gIGxldCBhc2lkZTtcbiAgbGV0IGJlYWNvbjtcbiAgbGV0IHByb2JsZW1zO1xuICBsZXQgcHJlRXJyb3JzO1xuICBsZXQgcHJlV2FybmluZ3M7XG4gIGxldCB0aXRsZUVycm9ycztcbiAgbGV0IHRpdGxlV2FybmluZ3M7XG5cbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgcHJlRXJyb3JzLmlubmVySFRNTCA9ICcnO1xuICAgIHByZVdhcm5pbmdzLmlubmVySFRNTCA9ICcnO1xuICAgIHByb2JsZW1zLmNsYXNzTGlzdC5yZW1vdmUoYCR7bnN9LXN1Y2Nlc3NgKTtcbiAgICBiZWFjb24uY2xhc3NOYW1lID0gJyc7XG4gICAgdGl0bGVFcnJvcnMuaW5uZXJUZXh0ID0gJyc7XG4gICAgdGl0bGVXYXJuaW5ncy5pbm5lclRleHQgPSAnJztcbiAgfTtcblxuICBjb25zdCBhZGRFcnJvcnMgPSAoZXJyb3JzKSA9PiB7XG4gICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgIHByb2JsZW1zLmNsYXNzTGlzdC5yZW1vdmUoYCR7bnN9LXN1Y2Nlc3NgKTtcbiAgICAgIGJlYWNvbi5jbGFzc0xpc3QuYWRkKGAke25zfS1lcnJvcmApO1xuXG4gICAgICBmb3IgKGNvbnN0IGVycm9yIG9mIGVycm9ycykge1xuICAgICAgICBjb25zdCBtYXJrdXAgPSBgPGRpdj48ZW0+RXJyb3I8L2VtPiBpbiAke2Vycm9yfTwvZGl2PmA7XG4gICAgICAgIGFkZEh0bWwobWFya3VwLCBwcmVFcnJvcnMpO1xuICAgICAgfVxuXG4gICAgICB0aXRsZUVycm9ycy5pbm5lclRleHQgPSBgJHtlcnJvcnMubGVuZ3RofSBFcnJvcihzKWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpdGxlRXJyb3JzLmlubmVyVGV4dCA9ICcnO1xuICAgIH1cbiAgICBhc2lkZS5jbGFzc0xpc3QucmVtb3ZlKGhpZGRlbik7XG4gIH07XG5cbiAgY29uc3QgYWRkV2FybmluZ3MgPSAod2FybmluZ3MpID0+IHtcbiAgICBpZiAod2FybmluZ3MubGVuZ3RoKSB7XG4gICAgICBwcm9ibGVtcy5jbGFzc0xpc3QucmVtb3ZlKGAke25zfS1zdWNjZXNzYCk7XG5cbiAgICAgIGlmICghYmVhY29uLmNsYXNzTGlzdC5jb250YWlucyhgJHtuc30tZXJyb3JgKSkge1xuICAgICAgICBiZWFjb24uY2xhc3NMaXN0LmFkZChgJHtuc30td2FybmluZ2ApO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IHdhcm5pbmcgb2Ygd2FybmluZ3MpIHtcbiAgICAgICAgY29uc3QgbWFya3VwID0gYDxkaXY+PGVtPldhcm5pbmc8L2VtPiBpbiAke3dhcm5pbmd9PC9kaXY+YDtcbiAgICAgICAgYWRkSHRtbChtYXJrdXAsIHByZVdhcm5pbmdzKTtcbiAgICAgIH1cblxuICAgICAgdGl0bGVXYXJuaW5ncy5pbm5lclRleHQgPSBgJHt3YXJuaW5ncy5sZW5ndGh9IFdhcm5pbmcocylgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXRsZVdhcm5pbmdzLmlubmVyVGV4dCA9ICcnO1xuICAgIH1cblxuICAgIGFzaWRlLmNsYXNzTGlzdC5yZW1vdmUoaGlkZGVuKTtcbiAgfTtcblxuICBpZiAob3B0aW9ucy5maXJzdEluc3RhbmNlKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgIGFkZENzcyhjc3MpO1xuICAgICAgW2FzaWRlXSA9IGFkZEh0bWwoaHRtbCk7XG4gICAgICBiZWFjb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tYmVhY29uYCk7XG4gICAgICBwcm9ibGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1wcm9ibGVtc2ApO1xuICAgICAgcHJlRXJyb3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LWVycm9yc2ApO1xuICAgICAgcHJlV2FybmluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30td2FybmluZ3NgKTtcbiAgICAgIHRpdGxlRXJyb3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LXRpdGxlLWVycm9yc2ApO1xuICAgICAgdGl0bGVXYXJuaW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS10aXRsZS13YXJuaW5nc2ApO1xuXG4gICAgICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1jbG9zZWApO1xuICAgICAgY29uc3QgbWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LW1pbmApO1xuXG4gICAgICBhc2lkZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgYXNpZGUuY2xhc3NMaXN0LnJlbW92ZShgJHtuc30tbWluYCk7XG4gICAgICB9KTtcblxuICAgICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGFzaWRlLmNsYXNzTGlzdC5hZGQoYCR7bnN9LWhpZGRlbmApO1xuICAgICAgfSk7XG5cbiAgICAgIG1pbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGFzaWRlLmNsYXNzTGlzdC5hZGQoYCR7bnN9LW1pbmApO1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzb2NrZXRNZXNzYWdlKHNvY2tldCwgKGFjdGlvbiwgZGF0YSkgPT4ge1xuICAgIGlmICghYXNpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IGNvbXBpbGVycyB9ID0gd2luZG93LndlYnBhY2tQbHVnaW5TZXJ2ZTtcblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlICdidWlsZCc6XG4gICAgICAgIC8vIGNsZWFyIGVycm9ycyBhbmQgd2FybmluZ3Mgd2hlbiBhIG5ldyBidWlsZCBiZWdpbnNcbiAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwcm9ibGVtcyc6XG4gICAgICAgIGFkZEVycm9ycyhkYXRhLmVycm9ycyk7XG4gICAgICAgIGFkZFdhcm5pbmdzKGRhdGEud2FybmluZ3MpO1xuICAgICAgICBhc2lkZS5jbGFzc0xpc3QucmVtb3ZlKGhpZGRlbik7XG4gICAgICAgIGhhc1Byb2JsZW1zID0gZGF0YS5lcnJvcnMubGVuZ3RoIHx8IGRhdGEud2FybmluZ3MubGVuZ3RoO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAvLyBpZiB0aGVyZSdzIGEgY29tcGlsZXIgdGhhdCBpc24ndCBkb25lIHlldCwgaG9sZCBvZmYgYW5kIGxldCBpdCBydW4gdGhlIHNob3dcbiAgICAgICAgZm9yIChjb25zdCBjb21waWxlck5hbWUgb2YgT2JqZWN0LmtleXMoY29tcGlsZXJzKSkge1xuICAgICAgICAgIGlmICghY29tcGlsZXJzW2NvbXBpbGVyTmFtZV0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzUHJvYmxlbXMgJiYgIXByZUVycm9ycy5jaGlsZHJlbi5sZW5ndGggJiYgIXByZVdhcm5pbmdzLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgaGFzUHJvYmxlbXMgPSBmYWxzZTtcbiAgICAgICAgICBwcm9ibGVtcy5jbGFzc0xpc3QuYWRkKGAke25zfS1zdWNjZXNzYCk7XG4gICAgICAgICAgYXNpZGUuY2xhc3NMaXN0LnJlbW92ZShoaWRkZW4pO1xuXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBhc2lkZS5jbGFzc0xpc3QuYWRkKGhpZGRlbiksIDNlMyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgaW5pdCB9O1xuIiwiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IGFkZEh0bWwgPSAoaHRtbCwgcGFyZW50KSA9PiB7XG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBub2RlcyA9IFtdO1xuXG4gIGRpdi5pbm5lckhUTUwgPSBodG1sLnRyaW0oKTtcblxuICB3aGlsZSAoZGl2LmZpcnN0Q2hpbGQpIHtcbiAgICBub2Rlcy5wdXNoKChwYXJlbnQgfHwgZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQoZGl2LmZpcnN0Q2hpbGQpKTtcbiAgfVxuXG4gIHJldHVybiBub2Rlcztcbn07XG5cbmNvbnN0IGFkZENzcyA9IChjc3MpID0+IHtcbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuXG4gIGlmIChjc3Muc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxuXG4gIC8vIGFwcGVuZCB0aGUgc3R5bGVzaGVldCBmb3IgdGhlIHN2Z1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbn07XG5cbmNvbnN0IHNvY2tldE1lc3NhZ2UgPSAoc29ja2V0LCBoYW5kbGVyKSA9PiB7XG4gIHNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCB7IGFjdGlvbiwgZGF0YSA9IHt9IH0gPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XG4gICAgaGFuZGxlcihhY3Rpb24sIGRhdGEpO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyBhZGRDc3MsIGFkZEh0bWwsIHNvY2tldE1lc3NhZ2UgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=