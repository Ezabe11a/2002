$(function (){

    var toDoList = {
        // 初始化方法
        init: function (){
            this.cacheElement();
            this.bindEvent();
        },
        // 缓存元素
        cacheElement: function (){
            this.$ipt = $('.ipt');
            this.$add = $('.add');
            this.$todolist = $('.todolist');
            this.$all = $('.all');
            this.$done = $('.done');
            this.$removes = $('.removes');
            this.$donelist = $('.donelist');
        },
        // 绑定事件
        bindEvent: function (){
            var _this = this;//toDoList
            // 点击添加任务
            this.$add.click(function (){
                // 保存输入的文本
                var conText = _this.$ipt.val();
                // var conText = $(this).siblings('.ipt').val();
                if (!conText){
                    return;
                }
                // 要插入的dom结构
                var addDom = `
                    <li>
                        <input type="checkbox" value="">
                        <span class="con">${conText}</span>
                        <span class="remove">删除</span>
                        <span class="edit">编辑</span>
                    </li>
                `;
                // todolist添加节点
                _this.$todolist.append(addDom);
                // 判断全选是否勾选
                if (_this.$all.prop('checked')) {
                    _this.$todolist.find('li input').prop('checked',true);
                }
                // 清空输入框
                _this.$ipt.val('');
            })

            // 点击编辑
            this.$todolist.on('click','li .edit',function (){
                var repDom = $(this).siblings('.con');
                var repText = repDom.text();
                $('<input type="text" class="repIpt">').replaceAll(repDom);
                $('.repIpt').val(repText).focus();
            })

            // 编辑完成
            this.$todolist.on('blur','li .repIpt',function (){
                var iptVal = $(this).val();
                var repDom = '<span class="con">'+iptVal+'</span>';
                $(repDom).replaceAll($(this));
            })

            // 删除单个任务
            this.$todolist.on('click','li .remove',function (){
                $(this).parent().remove();
            })

            // 点击全选
            this.$all.click(function (){
                if ($(this).prop('checked')) {//全选
                    $('.todolist li input').prop('checked',true);
                } else {//取消全选
                    $('.todolist li input').prop('checked',false);
                }
            })

            // 选择任务
            this.$todolist.on('click','li input',function (){
                var selectArr = [];//记录所有选项的状态
                $('.todolist li input').each(function (index,item){
                    if ($(item).prop('checked')) {
                        selectArr.push('a');
                    } else {
                        selectArr.push('b');
                    }
                })
                // [a,a,a,a]   [a,b,a,a]
                if (selectArr.indexOf('b') == -1) {//[a,a,a,a]全选
                    _this.$all.prop('checked',true);
                } else {//[a,b,a,a]取消全选
                    _this.$all.prop('checked',false);
                }
            })

            // 点击处理
            this.$done.click(function (){
                $('.todolist li input:checked').each(function (index,item){
                    var taskText = $(item).siblings('.con').text();
                    // 向已处理列表添加元素
                    _this.$donelist.append('<li>'+taskText+'</li>');
                    $(item).parent().remove();//删除当前元素的父节点
                    _this.$all.prop('checked',false);//取消全选
                })
            })

            // 点击删除(批量)
            this.$removes.click(function (){
                $('.todolist li input:checked').each(function (index,item){
                    $(item).parent().remove();//删除当前元素的父节点
                    _this.$all.prop('checked',false);//取消全选
                })
            })
        }
    }
    toDoList.init();

})