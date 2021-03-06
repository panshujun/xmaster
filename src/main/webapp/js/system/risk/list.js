var pageii = null;
var grid = null;
$(function() {

    grid = lyGrid({
        pagId : 'paging',
        l_column : [ {
            colkey : "id",
            name : "id",
        }, {
            colkey : "name",
            name : "名称",
            isSort:true,
        }, {
            colkey : "classification",
            name : "类别",
            isSort:true,
        }, {
            colkey : "critical_discharge",
            name : "限额"
        }, {
            name : "操作",
            renderData : function( rowindex ,data, rowdata, colkeyn) {
                return "测试渲染函数";
            }
        } ],
        jsonUrl : rootPath + '/risk/findByPage.shtml',
        checkbox : true,
        serNumber : true
    });
    $("#search").click("click", function() {// 绑定查询按扭
        var searchParams = $("#searchForm").serializeJson();// 初始化传参数
        grid.setOptions({
            data : searchParams
        });
    });

    $("#addFun").click("click", function() {
    	pageii = layer.open({
            title : "新增",
            type : 2,
            area : [ "600px", "80%" ],
            content : rootPath + '/risk/toAddQuotaPage.shtml'
        });
    });
    $("#editFun").click("click", function() {
    	var cbox = grid.getSelectedCheckbox();
        if (cbox.length > 1 || cbox == "") {
            layer.msg("只能选中一个");
            return;
        }
        pageii = layer.open({
            title : "编辑",
            type : 2,
            area : [ "600px", "80%" ],
            content : rootPath + '/risk/toEditQuotaPage.shtml?id=' + cbox
        });
    })
    $("#delFun").click("click", function() {
    	var cbox = grid.getSelectedCheckbox();
        if (cbox == "") {
            layer.msg("请选择删除项！！");
            return;
        }
        layer.confirm('是否删除？', function(index) {
            var url = rootPath + '/risk/doDeleteQuota.shtml';
            var s = CommnUtil.ajax(url, {
                ids : cbox.join(",")
            }, "json");
            if (s == "success") {
                layer.msg('删除成功');
                grid.loadData();
            } else {
                layer.msg('删除失败');
            }
        });
    });
});
