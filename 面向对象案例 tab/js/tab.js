var that;

class Tab {
    constructor(id) {
        //获取元素
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        //li的父元素
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        this.tabscon = this.main.querySelector('.tabscon');
        this.init();
    };
    //初始化操作 让相关元素绑定事件
    init() {
        this.updateNode();
        //调用addTab函数
        this.add.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            //绑定切换功能
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i], this);
            //绑定删除模块
            this.remove[i].onclick = this.removeTab;
            //绑定修改模块
            this.spans[i].ondblclick = this.edditTab;
            this.sections[i].ondblclick = this.edditTab;
        };
    };
    //获取所有li 和 section
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
    };

    //1.tab切换功能
    toggleTab(that) {
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';

    };
    //2.tab添加功能
    addTab() {
        //清除所有li和section 类名
        that.clearClass();
        //创建li元素 和section元素
        //在section中放一个random数字
        var random = Math.random();
        var li = ' <li  class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">新选项卡' + random + '</section>';
        //把li和section追加到对应父元素
        that.ul.insertAdjacentHTML('beforeend', li);
        that.tabscon.insertAdjacentHTML('beforeend', section);
        //调用that.init 解决bug
        that.init();

    };
    //3.tab删除功能
    removeTab(e) {
        //阻止冒泡 不然会切换li的class
        e.stopPropagation();
        //小X号没有index 但是li有 取来liの索引号
        var index = this.parentNode.index;
        //删除对应li以及section
        that.lis[index].remove();
        that.sections[index].remove();
        //删除后重新更新已有元素
        that.init();
        //删除选定的li让 上一个li处于选定状态
        //如果删除的不是选定状态的li则不改变选定状态
        if (document.querySelector('.liactive')) {
            return;
        }
        index--;
        //对上一个li进行一次点击操作，点击操作之前写过 所以直接成为选定状态
        //如果前面为真 则执行后面操作 这样index到-1的时候不会执行 
        that.lis[index] && that.lis[index].click();
    };
    //4.tab修改功能
    edditTab() {
        var str = this.innerHTML;
        //双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text"/>';
        //双击后文本框文字=原来文字
        var input = this.children[0];
        input.value = str;
        input.select(); //文字处于选定状态
        //离开文本框 把文本框内的值给span
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        };
        //按下回车也可以将文本框内的值给span
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                //调用鼠标失去焦点事件
                this.blur();
            }
        }
    };
    //清除类名函数
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    };
};
var tab = new Tab('#tab');