sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    '../model/formatter',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
  ],
  function (Controller, JSONModel, formatter, Filter, FilterOperator) {
    'use strict';
    return Controller.extend('sap.ui.demo.projekt.controller.EmployeesList', {
      formatter: formatter,
      onInit: function (Employees) {
        var oViewModel = new JSONModel();
        this.getView().setModel(oViewModel, 'view');
      },
      onFilterEmployees: function (oEvent) {
        // build filter array
        var aFilter = [];
        var sQuery = oEvent.getParameter('query');
        if (sQuery) {
          aFilter.push(new Filter('FirstName', FilterOperator.Contains, sQuery));
        }

        // filter binding
        var oList = this.byId('employeesList');
        var oBinding = oList.getBinding('items');
        oBinding.filter(aFilter);
      },

      onPress: function (oEvent) {
        var oItem = oEvent.getSource();
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo('detail', {
          employeesPath: window.encodeURIComponent(oItem.getBindingContext('employees').getPath().substr(1)),
        });
      },
    });
  }
);
