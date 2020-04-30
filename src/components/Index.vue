<template>
  <div>
    <div class="tab">
      <ul class="tab_ul">
        <li class="left">
          <i class="el-icon-s-unfold" @click="drawer = true"></i>
        </li>
        <li class="left" @click="goBookList()">书城</li>
        <li class="right">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="right" @click="goSearch()">
          <i class="el-icon-search"></i>
        </li>
      </ul>
      <el-drawer
        title=""
        :visible.sync="drawer"
        direction="ltr"
        :with-header="false"
        size="60%"
      >
        <div class="ltr_head"></div>
        <div class="ltr_menu">
          <table width="100%">
            <thead>
              <tr>
                <th width="20%" align="center"></th>
                <th width="80%" align="left"></th>
              </tr>
            </thead>
            <tbody>
              <tr height="45px">
                <td width="20%" align="center"><i class="el-icon-more"></i></td>
                <td widht="80" align="left" style="padding-left:8%">漫画</td>
              </tr>
              <tr height="45px">
                <td width="20%" align="center"><i class="el-icon-more"></i></td>
                <td widht="80" align="left" style="padding-left:8%">列表</td>
              </tr>
              <tr height="45px">
                <td width="20%" align="center"><i class="el-icon-more"></i></td>
                <td widht="80" align="left" style="padding-left:8%">图源</td>
              </tr>
              <tr height="45px">
                <td width="20%" align="center"><i class="el-icon-more"></i></td>
                <td widht="80" align="left" style="padding-left:8%">
                  夜间模式
                </td>
              </tr>
              <tr height="45px">
                <td width="20%" align="center"><i class="el-icon-more"></i></td>
                <td widht="80" align="left" style="padding-left:8%">备份</td>
              </tr>
              <tr height="45px">
                <td width="20%" align="center"><i class="el-icon-more"></i></td>
                <td widht="80" align="left" style="padding-left:8%">设置</td>
              </tr>
              <tr height="45px">
                <td width="20%" align="center"><i class="el-icon-more"></i></td>
                <td widht="80" align="left" style="padding-left:8%">关于</td>
              </tr>
            </tbody>
          </table>

          <!-- <ul>
            <li>漫画</li>
            <li>列表</li>
            <li>图源</li>
            <li>夜间模式</li>
            <li>备份</li>
            <li>设置</li>
            <li>关于</li>
          </ul> -->
        </div>
      </el-drawer>
    </div>
    <div
      class="book_fav"
      id="book-list-soroll"
      style="overflow:auto;height: 300px;width:100%"
    >
      <div>
        <ul class="box">
          <li v-for="(book, index) in book_list" :key="index">
            <div @click="book_info(book)">
              <el-image
                style="width: 150px; height: 200px"
                :src="book.img_url"
                fit="fill"
                lazy
              ></el-image>
              <p>{{ book.title }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      search_key: "",
      book_list: [],
      drawer: false
    };
  },
  mounted() {
    console.log(document.documentElement.clientHeight);
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    var div = document.getElementById("book-list-soroll");
    div.style.height = h - 50 -2 + "px"; //减去顶部高度
    this.bookFavList();

    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  methods: {
    bookFavList: function() {
      let _this = this;
      let book_fav_list = window.localStorage.getItem("bookFav");
      if (book_fav_list == null) {
        book_fav_list = "[]";
      }
      _this.book_list = JSON.parse(book_fav_list);
    },
    goSearch: function() {
      this.$router.replace({
        name: "SearchBook",
        params: { search_key: this.search_key }
      });
    },
    book_info: function(book) {
      this.$router.replace({
        name: "BookInfo",
        params: { book_info: book }
      });
    },
    goBookList: function() {
      this.$router.replace({
        name: "HelloWorld"
      });
    },
    pchandleIconClick: function() {},
    searchEnterFun: function() {},
    goBack() {
      this.$router.go(-1);
    } //replace替换原路由，作用是避免回退死循环  }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
}
.tab {
  height: 50px;
}

.tab_ul {
  line-height: 50px;
  font-size: 20px;
}
.tab_ul > li {
  display: inline-block;

  padding: 0px 15px;
}

.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  width: 100%;
}
.box > li {
  display: inline-block;
  width: 50%;
  margin: 5px 0px;
}
.ltr_head {
  height: 15%;
  background-color: aqua;
}
</style>
