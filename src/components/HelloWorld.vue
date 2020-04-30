<template>
  <div>
    <el-page-header @back="goBack" content="书库"></el-page-header>
    <div class="wrapper " ref="wrapper" id="book-list-soroll">
      <ul class="box bscroll-container ">
        <li v-for="(book, index) in book_list" :key="index">
          <div @click="book_info(book)">
            <el-image
              style="width: 150px; height: 200px"
              :src="book.img_url"
              fit="fill"
            ></el-image>
            <p>{{ book.title }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "HelloWorld",
  data() {
    return {
      page: 1,
      totalPages: "",
      book_list: []
    };
  },
  computed: {},
  created() {
    this.loadData();
  },
  mounted() {
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    var div = document.getElementById("book-list-soroll");
    div.style.height = h - 50 - 1 + "px"; //减去顶部高度
  },
  methods: {
    loadData: function() {
      this.$ajax.get("/api/book" + "?page=" + this.page).then(res => {
        this.book_list = this.book_list.concat(res.data.data);
        this.page += 1;
        this.$nextTick(() => {
          if (!this.scroll) {
            const options = {
              scrollY: true, // 因为scrollY默认为true，其实可以省略
              scrollX: true,
              mouseWheel: true,
              click: true,
              taps: true
            };
            this.scroll = new BScroll(this.$refs.wrapper, options);
            //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
            this.scroll.on("touchEnd", pos => {
              // 下拉动作
              if (pos.y > 50) {
                console.log("下拉刷新成功");
                this.dropDown = false;
              }
              //上拉加载 总高度>下拉的高度+10 触发加载更多
              if (this.scroll.maxScrollY > pos.y + 10) {
                console.log("加载更多");
                //使用refresh 方法 来更新scroll  解决无法滚动的问题
                this.loadData();
                this.scroll.refresh();
              }
            });
          } else {
            this.scroll.refresh();
          }
        });
      });
    },
    book_list_page: function() {
      let _this = this;
      _this.$ajax
        .get("/api/book" + "?page=" + this.page)
        .then(resp => {
          _this.totalPages = resp.data.totalPages;
          resp.data.data.forEach(element => {
            _this.book_list.push(element);
          });
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    book_info: function(book) {
      this.$router.replace({
        name: "BookInfo",
        params: { book_info: book }
      });
    },
    goBack: function() {
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
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

.loading span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #409eff;
  border-left: transparent;
  animation: zhuan 0.5s linear infinite;
  border-radius: 50%;
}

.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  width: 100%;
  text-align: center;
}
.box > li {
  width: 50%;
}
.el-page-header {
  height: 50px;
  line-height: 50px;
}
.wrapper {
  width: 100%;
  overflow: hidden;
}
</style>
