<template>
  <div>
    <el-page-header @back="goBack" content="详情页面"></el-page-header>
    <div class="book-info ">
      <div class="book-info-header clearfix">
        <div class="left">
          <img
            :src="book_info.img_url"
            alt=""
            width="100"
            height="120"
            style="margin-right:0.5rem"
          />
        </div>
        <div class="left">
          <ul class="book-info-ul">
            <li class="book-info-title">
              <h4>{{ book_info.title }}</h4>
            </li>
            <li>{{ book_info.author }}</li>
            <li>
              {{ book_info.category_name }}/{{ book_info.category_sub_name }}
            </li>
            <li>250万字 | {{ book_info.book_status }}</li>
          </ul>
        </div>
      </div>
      <div class="book-info-read-bt">
        <el-button type="danger" plain
          ><el-link :href="book_info.info_url" :underline="false"
            >免费阅读</el-link
          ></el-button
        >
        <el-button type="info" plain @click="addFav()">加入收藏</el-button>
        <el-button type="info" plain>删除收藏</el-button>
      </div>
      <div class="book-info-intro">
        <p class="book-info-content">
          {{ book_info.book_intro }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookInfo",
  data() {
    return {
      book_info: {
        id: 75,
        page_url:
          "https://www.qidian.com/all?orderId=&style=1&pageSize=20&siteid=1&pubflag=0&hiddenField=0&page=4",
        info_url: "http://book.qidian.com/info/1015276074",
        img_url: "http://bookcover.yuewen.com/qdbimg/349573/1015276074/150",
        title: "饲养全人类",
        author: "三百斤的微笑",
        author_url: "http://my.qidian.com/author/403951862",
        category_name: "都市",
        category_url: "http://www.qidian.com/dushi",
        category_sub_name: "都市生活",
        book_status: "连载",
        book_size: "&#100501;&#100505;&#100508;&#100499;&#100500;&#100502;",
        book_intro:
          "\r                        部落农耕时代，世界是庞大未知的。随着不断的探索，古人惊骇的发现，这个世界，天圆地方，有各种神迹降临，甚至有身高万丈的超大型巨人，智慧巨兽的身影神秘出现，踩踏山川、破碎大地。数百年后，在这样险恶的环境下\r                    "
      }
    };
  },
  created() {
    this.book_info = this.$route.params.book_info;
  },
  mounted() {},
  methods: {
    goBack: function() {
      this.$router.go(-1);
    },
    addFav: function() {
      let book_fav = window.localStorage.getItem("bookFav");
      if (book_fav == null || book_fav == "" || book_fav == undefined) {
        book_fav = "[]";
      }
      book_fav = JSON.parse(book_fav);
      let isFav = true;
      let new_book = [];
      book_fav.forEach((element, index, arr) => {
        if (element.info_url == this.book_info.info_url) {
          isFav = false;
        } else {
          new_book.push(book_fav[index]);
        }
      });
      if (isFav) {
        new_book.unshift(this.book_info);
      }
      window.localStorage.setItem("bookFav", JSON.stringify(new_book));
      //   window.location.href = book.info_url;
    }
  }
};
</script>

<style lang="">
.el-page-header {
  height: 50px;
  line-height: 50px;
}
.book-info-header {
  padding: 1rem;
}
.book-info-ul > li {
  height: 30px;
  line-height: 30px;
}
.book-info-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.book-info-read-bt {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.book-info-content {
  font-size: 0.875rem;
  line-height: 1.5rem;
  position: relative;
  overflow: hidden;
  max-height: 5.92rem;
  margin-left: 1rem;
  padding-right: 1rem;
  text-align: justify;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  box-shadow: 0 1px #f0f1f2, 0 -1px #f0f1f2;
}
</style>
