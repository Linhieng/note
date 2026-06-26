# CSS 常见样式使用方案

## demo1 实现 div 垂直居中，并且高度始终是宽度的一半

核心：
让 outer 实现 flex + align-item:center 布局，实现子元素垂直居中。
让 inner 高度为零，此时 inner 就始终在中线上。
让 inner 的 padding-top/bottom 为 50%，实现高度始终是宽度的一半。
由于此时 inner 高度是由 padding 会撑起的，所以要将 inner 设置为相对定位，
然后 inner 中的内容 box 设置为绝对定位，并让其宽高等于 100%。
这样一来，box 的大小就是 inner 的大小了。


<section class="demo1">
    <div class="outer">
        <div class="inner">
            <div class="box">hello</div>
        </div>
    </div>
</section>

<style>

.demo1 {
  height: 300px;
}
.demo1 * {
  margin: 0;
  padding: 0;
}
.demo1 .outer {
  width: 400px;
  height: 100%;
  background: blue;
  margin: 0 auto;

  display: flex;
  align-items: center;
}

.demo1 .inner {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 50%;
  background: skyblue;
}

.demo1 .box {
  color: white;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

::: details 具体代码
```html

<section class="demo1">
    <div class="outer">
        <div class="inner">
            <div class="box">hello</div>
        </div>
    </div>
</section>

<style>

.demo1 {
  height: 300px;
}
.demo1 * {
  margin: 0;
  padding: 0;
}
.demo1 .outer {
  width: 400px;
  height: 100%;
  background: blue;
  margin: 0 auto;

  display: flex;
  align-items: center;
}

.demo1 .inner {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 50%;
  background: skyblue;
}

.demo1 .box {
  color: white;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```
:::

## demo2 实现宽高为父元素一半的正方形

核心：
因为高度的百分比是相对高度的，所以涉及到要让高度和父元素宽度相关时，
都可以借助利用 padding 来实现高度。因为 padding 的百分比相对的是父元素的宽度。

<section class="demo2">
  <div class="outer">
    <div class="inner"></div>
  </div>
</section>

<style>
  .demo2 .outer {
    width: 300px;
    height: 400px;
    background: red;
    margin: 0 auto;
  }

  .demo2 .inner {
    width: 50%;
    height: 0;
    padding-bottom: 50%;
    background: blue;
  }
</style>

::: details 具体代码
```html

<section class="demo2">
  <div class="outer">
    <div class="inner"></div>
  </div>
</section>

<style>
  .demo2 .outer {
    width: 300px;
    height: 400px;
    background: red;
    margin: 0 auto;
  }

  .demo2 .inner {
    width: 50%;
    height: 0;
    padding-bottom: 50%;
    background: blue;
  }
</style>
```
:::

## 实现两栏或多栏布局

多栏布局的核心就是让元素处于同一行，此时有下一几种方案

方案一：使用浮动让两个元素在同一行

方案二：使用 flex 让元素在同一行

方案三：使用 grid 让元素处于同一行

## 实现各种居中

方案一：已知宽高，使用绝对定位加 left top 为 50% 实现水平垂直居中

方法二：未知宽高，使用绝对定位加 left top 为 50% ，同时再加上 transform(-50%, -50%) 实现水平垂直居中

方案三：使用绝对定位加 top, left, bottom, right 为 0，让 margin auto 实现水平垂直居中

方案四：使用 display: table-cell 和 vertical-align: middle 实现水平垂直居中。

方案五：使用 flex, align-item, justify-content 实现水平垂直居中

方案六：使用 grid, place-items:center, grid-template: 1fr/1fr; 实现水平垂直居中
