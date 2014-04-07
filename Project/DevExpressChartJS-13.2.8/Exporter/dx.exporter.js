/*! 
* DevExpress Exporter (part of ChartJS)
* Version: 13.2.8
* Build date: Mar 11, 2014
*
* Copyright (c) 2012 - 2014 Developer Express Inc. ALL RIGHTS RESERVED
* EULA: http://chartjs.devexpress.com/EULA
*/
"use strict";DevExpress.MOD_TMP_WIDGETS_FOR_EXPORTER||(function(n,t){var e=t.ui,d=t.utils,r=e.events,o="<div />",a="<ul />",s="bottom",u="dxMenu",f="dxMenuItem",v=50,g=r.addNamespace("dxclick",u),y=r.addNamespace("mouseenter",u),p=r.addNamespace("mouseleave",u),nt=r.addNamespace("dxpointerdown",u),h=r.addNamespace("mousemove",u),w="dx-menu-item-items-over",c="dx-menu-item-hovered",l="dx-menu-item-highlight",b="dx-menu-item-disabled",k=t.Class.inherit({_addItems:function(t){var i=this;n.each(t.items,function(n,t){var r=new k(t,i);i._items.push(r)})},_createOverlay:function(n,i,r){var u=this;return n.dxOverlay({targetContainer:i,closeOnOutsideClick:!0,closeOnTargetScroll:!0,position:{offset:u._calculateOffset(r),my:t.inverseAlign(u._horizontalExpandDirection)+" "+t.inverseAlign(u._verticalExpandDirection),at:r?t.inverseAlign(u._horizontalExpandDirection)+" "+u._verticalExpandDirection:u._horizontalExpandDirection+" "+t.inverseAlign(u._verticalExpandDirection),of:u._$item,collision:"flip"},showTitle:!1,width:"auto",height:"auto",shading:!1,deferRendering:!1,animation:{show:{type:"fade",from:0,to:1,duration:v},hide:{type:"fade",from:1,to:0,delay:0,duration:0}},positionedAction:function(n){var i=u._parent._horizontalExpandDirection||u._horizontalExpandDirection,r=n.component.content().children();u._horizontalExpandDirection=n.position.h.flip?t.inverseAlign(i):i,u._$item.offset().top>u._overlay.content().offset().top&&u._$item.addClass(w)},showingAction:function(){r&&u._overlay.content().css("min-width",u._$item.outerWidth()),u._$item.addClass(c)},hiddenAction:function(){u._$item.removeClass(c).removeClass(w)}}).dxOverlay("instance")},_drawItem:function(){var t=this,u="<span />",i=n(o).addClass("dx-menu-item"),r,f,e;return(t.options.imageUrl||t.options.imageCSS)&&(r=n(u).addClass("dx-menu-image"),t.options.imageUrl&&r.append('<img src="'+t.options.imageUrl+'" />'),t.options.imageCSS&&r.addClass(t.options.imageCSS),i.append(r)),t.options.caption&&(f=n(u).addClass("dx-menu-caption").text(t.options.caption),i.append(f)),t._items.length&&(e=n(u).addClass("dx-menu-chouser-down"),i.append(e)),t.options.disabled&&i.addClass(b),i},_draw:function(t,i){var r=this,e,s=n(o),h=n(a),u=n("<li />");s.append(h),e=r._drawItem(),r._$item=e,r._$rootItem=u,u.append(e),u.data(f,r),t.append(u),r._items.length&&(u.append(s),r._overlay=r._createOverlay(s,u,i)),n.each(r._items,function(n,t){t._draw(r._overlay.content().children(),!1)})},_hideAllChildren:function(){n.each(this._items,function(){this._togglePopup(!1),this._hideAllChildren()})},_togglePopup:function(n){var i=this;!i.options.disabled&&i._overlay&&(i._visible||(i._hideAllChildren(),i._parent._visible&&i._overlay.option("position",{offset:i._calculateOffset(!1),my:t.inverseAlign(i._parent._horizontalExpandDirection)+" "+t.inverseAlign(i._verticalExpandDirection),at:i._parent._horizontalExpandDirection+" "+t.inverseAlign(i._verticalExpandDirection)})),i._overlay.toggle(n),i._visible=i._$item.hasClass(c))},_showPopupOnHoverStay:function(){function t(){Math.abs(n._pX-n._X)+Math.abs(n._pY-n._Y)<3?(n._togglePopup(!0),n._$rootItem.off(h)):n.compareTimer=setTimeout(function(){t()},v),n._pX=n._X,n._pY=n._Y}var n=this;n._$rootItem.on(h,function(t){n._X=t.pageX,n._Y=t.pageY});n.compareTimer=setTimeout(function(){t()})},_calculateOffset:function(n){var t=this,r,u,i=(t._$rootItem.innerWidth()-t._$rootItem.width())/2,f=(t._$rootItem.parent().outerWidth()-t._$rootItem.parent().innerWidth())/2;return n?(r=0,u=t._parent._verticalExpandDirection===s?-1:1):(r=t._parent._horizontalExpandDirection==="right"?i:-i,u=t._parent._verticalExpandDirection===s?-(f+i):f+i),r+" "+u},toggleItemEnabledState:function(n){this.options.disabled=d.isDefined(n)?n:!this.options.disabled,this._$item.toggleClass(b,n)},ctor:function(n,t){var i=this;i.options=n||{},i.options.disabled=n.disabled||!1,i._items=[],i._parent=t,i._horizontalExpandDirection=n.horizontalExpandDirection||t._horizontalExpandDirection,i._verticalExpandDirection=n.verticalExpandDirection||t._verticalExpandDirection,n.items&&n.items.length&&i._addItems(n)}});e.registerComponent("dxMenu",e.Widget.inherit({_init:function(){var n=this.option(["items","name","verticalExpandDirection","horizontalExpandDirection"]);this._mainMenuItem=new k(n)},_defaultOptions:function(){return{verticalExpandDirection:s,horizontalExpandDirection:"right",highlightActiveItem:!1,showPopupMode:"onhover",orientation:"horizontal"}},addItems:function(n){this._mainMenuItem._addItems(n),this._render()},_render:function(){var t=this,u=t.option("orientation")!=="vertical",r=t._element(),i=n(a),f=n(o).append(i);u?i.addClass("dx-menu-horizontal"):i.addClass("dx-menu-vertical"),r.addClass("dx-menu"),t._highlightActiveItem=t.option("highlightActiveItem"),t._clickAction=t._createActionByOption("itemClickAction"),r.append(f),t._resubscribeEventHandlers(r,"li"),n.each(t._mainMenuItem._items,function(n,t){t._draw(i,u)}),t._highlightActiveItem&&(t._$highlightedElement=t._mainMenuItem._items[0]._items[0]._$item,t._$highlightedElement.addClass(l))},_resubscribeEventHandlers:function(n,t){var i=this,u=i.option("showPopupMode")||"",r={};switch(u.toLowerCase()){case"onclick":break;case"onhoverstay":r[y]=i._itemOnHoverStayHandler(!0),r[p]=i._itemOnHoverStayHandler(!1);break;default:r[y]=i._itemOnHoverHandler(!0),r[p]=i._itemOnHoverHandler(!1)}r[nt]=i._itemPointerDownHandler(),r[g]=i._itemOnClickHandler();n.off(".dxMenu").on(r,t)},_itemPointerDownHandler:function(){return function(){var i=n(this).data(f);i._hideOnPointerDown=i._overlay&&i._overlay.option("visible")}},_itemOnHoverHandler:function(t){return function(i){var r=n(this).data(f);r._togglePopup(t),i.stopPropagation()}},_itemOnHoverStayHandler:function(t){return function(i){var r=n(this).data(f);t?r._showPopupOnHoverStay():(clearTimeout(r.compareTimer),r._$rootItem.off(h),r._togglePopup(!1)),i.stopPropagation()}},_itemOnClickHandler:function(){var t=this;return function(i){var r=n(this).data(f);r._$item[0].contains(i.target)&&(r._overlay&&!r._overlay.option("visible")&&r._parent._hideAllChildren(),r._hideOnPointerDown||r._togglePopup()),r.options.disabled||r._items.length||(t._highlightActiveItem&&(t._$highlightedElement.removeClass(l),t._$highlightedElement=r._$item,t._$highlightedElement.addClass(l)),t._clickAction({item:r,itemElement:r._$item}),t._mainMenuItem._hideAllChildren()),i.stopPropagation()}}}))}(jQuery,DevExpress),function(n,t,i){var u=t.ui,e=t.utils,f=u.events,o=t.fx,r="dx-overlay",h=r+"-wrapper",c=r+"-content",l=r+"-shader",a=r+"-modal",v=500,s=["showingAction","shownAction","hidingAction","hiddenAction","positioningAction","positionedAction"],y=1e3,p="dx-state-disabled";u.registerComponent("dxOverlay",u.ContainerWidget.inherit({_defaultOptions:function(){return n.extend(this.callBase(),{activeStateEnabled:!1,visible:!1,deferRendering:!0,shading:!0,position:{my:"center",at:"center",of:window},width:function(){return n(window).width()*.8},height:function(){return n(window).height()*.8},animation:{show:{type:"pop",duration:400},hide:{type:"pop",duration:400,to:{opacity:0,scale:0},from:{opacity:1,scale:1}}},closeOnOutsideClick:!1,closeOnTargetScroll:!1,showingAction:null,shownAction:null,positioningAction:null,positionedAction:null,hidingAction:null,hiddenAction:null,targetContainer:i,backButtonHandler:i})},_optionsByReference:function(){return n.extend(this.callBase(),{animation:!0})},_wrapper:function(){return this._$wrapper},_container:function(){return this._$container},_init:function(){this.callBase(),this._actions={},this._initWindowResizeHandler(),this._initCloseOnOutsideClickHandler(),this._$wrapper=n("<div>").addClass(h),this._$container=n("<div>").addClass(c);this._$wrapper.on("MSPointerDown",n.noop)},_initOptions:function(n){this._initTargetContainer(n.targetContainer),this._initBackButtonHandler(n.backButtonHandler),this.callBase(n)},_initTargetContainer:function(r){r=r===i?t.overlayTargetContainer():r;var f=this._element(),u=f.closest(r);u.length||(u=n(r).first()),this._$targetContainer=u.length?u:f.parent()},_initBackButtonHandler:function(t){this._backButtonHandler=t!==i?t:n.proxy(this._defaultBackButtonHandler,this)},_defaultBackButtonHandler:function(){this.hide()},_initWindowResizeHandler:function(){this._windowResizeCallback=n.proxy(this._renderGeometry,this)},_initCloseOnOutsideClickHandler:function(){this._documentDownHandler=n.proxy(function(){this._handleDocumentDown.apply(this,arguments)},this)},_handleDocumentDown:function(t){var i=this.option("closeOnOutsideClick");if(n.isFunction(i)&&(i=i(t)),i){var r=this._$container,u=!r.is(t.target)&&!n.contains(r.get(0),t.target),f=Math.abs(t.timeStamp-this._showTimestamp)<v;u&&!f&&this.hide()}},_render:function(){var n=this._element();this._$wrapper.addClass(n.attr("class")),this._setActions(),this._renderModalState(),this.callBase(),n.addClass(r)},_setActions:function(){var t=this;n.each(s,function(n,i){t._actions[i]=t._createActionByOption(i)||function(){}})},_renderModalState:function(){this._$wrapper.toggleClass(a,this.option("shading")&&!this.option("targetContainer"))},_renderVisibilityAnimate:function(t){return t&&(this._showTimestamp=n.now()),this._stopAnimation(),t?this._makeVisible():this._makeHidden()},_makeVisible:function(){var i=this,r=n.Deferred(),f=i.option("animation")||{},t=f.show,e=t&&t.complete||n.noop,u=++y;return this._$wrapper.css("z-index",u),this._$container.css("z-index",u),this._actions.showingAction(),this._toggleVisibility(!0),this._animate(t,function(){e.apply(this,arguments),i._actions.shownAction(),r.resolve()}),r.promise()},_makeHidden:function(){var i=this,r=n.Deferred(),u=this.option("animation")||{},t=u.hide,f=t&&t.complete||n.noop;return this._actions.hidingAction(),this._toggleShading(!1),this._animate(t,function(){i._toggleVisibility(!1),f.apply(this,arguments),i._actions.hiddenAction(),r.resolve()}),r.promise()},_animate:function(t,i){t?o.animate(this._$container,n.extend({},t,{complete:i})):i()},_stopAnimation:function(){o.stop(this._$container,!0)},_toggleVisibility:function(n){this._stopAnimation(),this.callBase.apply(this,arguments),this._$container.toggle(n),this._toggleShading(n),this._toggleSubscriptions(n),n?(this._renderContent(),this._moveToTargetContainer(),this._renderGeometry()):this._moveFromTargetContainer()},_toggleShading:function(n){this._$wrapper.toggleClass(l,n&&this.option("shading"))},_toggleSubscriptions:function(n){this._toggleWindowResizeSubscription(n),this._toggleBackButtonCallback(n),this._toggleDocumentDownHandler(n),this._toggleParentsScrollSubscription(n)},_toggleWindowResizeSubscription:function(n){n?e.windowResizeCallbacks.add(this._windowResizeCallback):e.windowResizeCallbacks.remove(this._windowResizeCallback)},_toggleBackButtonCallback:function(n){this._backButtonHandler&&(n?t.backButtonCallback.add(this._backButtonHandler):t.backButtonCallback.remove(this._backButtonHandler))},_toggleDocumentDownHandler:function(t){var r=this,i=f.addNamespace("dxpointerdown",r.NAME);if(t)n(document).on(i,this._documentDownHandler);else n(document).off(i,this._documentDownHandler)},_toggleParentsScrollSubscription:function(t){var i=this.option("position");if(i&&i.of){var r=this,e=this.option("closeOnTargetScroll"),u=n(i.of).parents();if(u.off(f.addNamespace("scroll",r.NAME)),t&&e)u.on(f.addNamespace("scroll",r.NAME),function(n){n.overlayProcessed||(n.overlayProcessed=!0,r.hide())})}},_renderContent:function(){this._contentAlreadyRendered||!this.option("visible")&&this.option("deferRendering")||(this._contentAlreadyRendered=!0,this.callBase())},_renderContentImpl:function(n){var t=this._element();this._$container.append(t.contents()).appendTo(t),(n||this._templates.template).render(this.content())},_fireContentReadyAction:function(){this.option("visible")&&this._moveToTargetContainer(),this.callBase.apply(this,arguments)},_moveToTargetContainer:function(){this._attachWrapperToTargetContainer(),this._$container.appendTo(this._$wrapper)},_attachWrapperToTargetContainer:function(){var n=this._element();!this._$targetContainer||this._$targetContainer[0]===n.parent()[0]?this._$wrapper.appendTo(n):this._$wrapper.appendTo(this._$targetContainer)},_moveFromTargetContainer:function(){this._$container.appendTo(this._element()),this._detachWrapperFromTargetContainer()},_detachWrapperFromTargetContainer:function(){this._$wrapper.detach()},_renderGeometry:function(){this.option("visible")&&this._renderGeometryImpl()},_renderGeometryImpl:function(){this._renderDimensions(),this._renderPosition()},_renderDimensions:function(){this._$container.width(this.option("width")).height(this.option("height"))},_renderPosition:function(){var r=this.option("position"),u=this._$wrapper,i=r?n(r.of):n(),f,e;u.css("position",i.get(0)===window?"fixed":"absolute"),this.option("shading")&&(this._$wrapper.show(),u.css({width:i.outerWidth(),height:i.outerHeight()}),t.position(u,{my:"top left",at:"top left",of:i})),this._$container.css("transform","none"),f=t.calculatePosition(this._$container,r),this._actions.positioningAction({position:f}),e=t.position(this._$container,f),this._actions.positionedAction({position:e})},_refresh:function(){this._renderModalState(),this._toggleVisibility(this.option("visible"))},_dispose:function(){this._stopAnimation(),this._toggleSubscriptions(!1),this._actions=null,this.callBase(),this._$wrapper.remove(),this._$container.remove()},_toggleDisabledState:function(n){this.callBase.apply(this,arguments),this._$container.toggleClass(p,n)},_optionChanged:function(t,i){if(n.inArray(t,s)>-1){this._setActions();return}switch(t){case"shading":this._toggleShading(this.option("visible"));break;case"width":case"height":case"position":this._renderGeometry();break;case"visible":this._renderVisibilityAnimate(i).done(n.proxy(function(){this._animateDeferred&&(this._animateDeferred.resolveWith(this),delete this._animateDeferred)},this));break;case"targetContainer":this._initTargetContainer(i),this._invalidate();break;case"deferRendering":this._invalidate();break;case"closeOnOutsideClick":this._toggleDocumentDownHandler(this.option("visible"));break;case"closeOnTargetScroll":this._toggleParentsScrollSubscription(this.option("visible"));break;case"overlayShowEventTolerance":case"animation":break;default:this.callBase.apply(this,arguments)}},toggle:function(t){if(t=t===i?!this.option("visible"):t,t===this.option("visible"))return n.Deferred().resolve().promise();var r=n.Deferred();return this._animateDeferred=r,this.option("visible",t),r.promise()},show:function(){return this.toggle(!0)},hide:function(){return this.toggle(!1)},content:function(){return this._$container},repaint:function(){this._renderGeometry()}}))}(jQuery,DevExpress),DevExpress.MOD_TMP_WIDGETS_FOR_EXPORTER=!0);DevExpress.MOD_TMP_EXPORTER||(function(n,t){var i=n.ui,c=n.utils,r="file",l="body",e="dx-exporter-icon-to",o="dx-exporter-icon-print",a="dx-non-printable",v="dx-printable",u=["PDF","PNG","SVG"],s=["JPEG","GIF"].concat(u),h=n.viz.core,f=i.Component.inherit({_normalizeHtml:function(n){return h.widgetMarkupMixin._normalizeHtml(n)},_getSvgElements:function(){var n=this,i=[];return t(n.getsourceContainer()).find("svg").each(function(r){i[r]=n._normalizeHtml(t(this).clone().wrap("<div><\/div>").parent().html())}),JSON.stringify(i)},_appendTextArea:function(n,i,r){t("<textarea/>",{id:n,name:n,val:i}).appendTo(r)},_formSubmit:function(n){n.submit(),n.remove()},_defaultOptions:function(){return{menuAlign:"right",exportFormat:u,printingEnabled:!0,fileName:r,showMenu:!0}},_createWindow:function(){return window.open("","printDiv","")},_createExportItems:function(n){var i=this;return t.map(n,function(n){return(n=n.toUpperCase(),t(i.getsourceContainer()).find("svg").length>1&&n==="SVG")?null:t.inArray(n.toUpperCase(),s)===-1?null:{name:n,caption:n+" "+r}})},getsourceContainer:function(){var n=this.option("sourceContainer")||this.option("sourceContainerId");return t(n)},_render:function(){var n=this,u=n.option("fileName"),f=n._createExportItems(n.option("exportFormat")),i=t("<div />"),r=[{name:"export",imageCSS:e,items:f}],s={align:n.option("menuAlign"),items:r,itemClickAction:function(t){switch(t.item.options.name){case"print":n.print();break;default:n.exportTo(u,t.item.options.name)}}};n.option("showMenu")&&(n.option("printingEnabled")&&r.push({imageCSS:o,name:"print",click:function(){n.print()}}),i.dxMenu(s),n._$element.empty(),n._$element.append(i))},print:function(){var i=this.getsourceContainer().html(),n=this._createWindow();t(n.document.body).html(i),n.document.close(),n.focus(),n.print(),n.close()},exportTo:function(n,i){var r=this,f=r.getsourceContainer(),u=t("<form/>",{method:"POST",action:r.option("serverUrl"),enctype:"application/x-www-form-urlencoded",target:"_self",css:{display:"none",visibility:"hidden"}});r._appendTextArea("exportContent",f.clone().wrap("<div><\/div>").parent().html(),u),r._appendTextArea("svgElements",r._getSvgElements(),u),r._appendTextArea("fileName",n,u),r._appendTextArea("format",i.toLowerCase(),u),r._appendTextArea("width",f.width(),u),r._appendTextArea("height",f.height(),u),r._appendTextArea("url",window.location.host,u),t(document.body).append(u),r._formSubmit(u)}});t.extend(!0,n,{exporter:{Exporter:f}}),i.registerComponent("dxExporter",f)}(DevExpress,jQuery),DevExpress.MOD_TMP_EXPORTER=!0);