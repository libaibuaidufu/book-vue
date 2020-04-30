<template>
  <div>
    <el-page-header @back="goBack" content="搜索页面"> </el-page-header>
    <div class="search">
      <el-input
        placeholder="请输入书名"
        icon="search"
        v-model="search_key"
        :on-icon-click="pchandleIconClick"
        @keyup.enter.native="searchEnterFun"
      >
      </el-input>
    </div>
    <div class="book-list">
      <div
        id="book-list-soroll"
        class="infinite-list-wrapper"
        style="overflow:auto;height: 300px;"
      >
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
        <p v-if="noMore" style="margin-top:10px;font-size:13px;color:#ccc">
          没有更多了
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      book_list: [],
      search_key: "",
      noMore: false
    };
  },
  computed: {},
  created() {
    console.log("created");
    this.getRouterData();
    this.searchEnterFun();
  },
  mounted() {
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    var div = document.getElementById("book-list-soroll");
    div.style.height = h - 110 + "px"; //减去顶部高度
  },
  methods: {
    getRouterData() {
      this.search_key = this.$route.params.search_key;
    },
    book_info: function(book) {
      this.$router.replace({
        name: "BookInfo",
        params: { book_info: book }
      });
    },
    pchandleIconClick: function() {
      console.log("two");
    },
    searchEnterFun: function() {
      let _this = this;
      if (_this.search_key == "") {
        return;
      }
      _this.$ajax
        .get("/api/search/" + _this.search_key)
        .then(resp => {
          _this.totalPages = resp.data.totalPages;
          _this.book_list = [];
          resp.data.data.forEach(element => {
            _this.book_list.push(element);
          });
          if (_this.book_list.length == 0) {
            _this.noMore = true;
          } else {
            _this.noMore = false;
          }
          //   this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goBack: function() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.book-list {
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 5px 0px;
}

.infinite-list-wrapper {
  width: 100%;
}

.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  width: 100%;
}
.box > li {
  width: 50%;
}
.el-page-header {
  height: 50px;
  line-height: 50px;
}
.search {
  width: 80%;
  margin: 10px auto;
}
</style>
