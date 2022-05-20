sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'sap/ui/core/routing/History', 'sap/ui/model/json/JSONModel'],
  function (Controller, History, JSONModel) {
    'use strict';

    return Controller.extend('sap.ui.demo.projekt.controller.Detail', {
      onInit: function (Employees) {
        var oViewModel = new JSONModel();
        this.getView().setModel(oViewModel, 'view');

        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.getRoute('detail').attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
        this.getView().bindElement({
          path: '/' + window.decodeURIComponent(oEvent.getParameter('arguments').employeesPath),
          model: 'employees',
        });
      },

      onNavBack: function () {
        var oHistory = History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo('overview', {}, true);
        }
      },
    });
  }
);
