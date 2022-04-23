<template>
  <div class="home">
    <h1 :style="active ? 'color:#fff' : 'color:#000'">ZhangYu</h1>
    <div>
      You are where you are.Accept it and feel the power your acceptance gives
      you to move forward.<br /><br />
      This moment is as it is.Accept its uniqueness and experience the freedom
      of not having to fight against it.<br /><br />
      There are difficult challenges in your life.Accept them and feel the
      energy that will enable you to rise above them.<br /><br />
      Accept that this is your starting point.Instead of placing judgements on
      it,see the real,positive value that’s already yours.You cannot change
      where your past priorities* and choices have brought you.Yet you can make
      use of the wisdom you’ve earned to create a future that fulfils your most
      treasured dreams.<br /><br />
      Lovingly and gratefully accept who you’ve been,what you’ve done,what you
      have and where you are.For you can now transform it all into what you most
      wish to be.
    </div>
    <div>
      Find me on
      <!-- <a :style="active ? 'color:#fff' : 'color:#000'">QQ</a>, -->
      <!-- <a :style="active ? 'color:#fff' : 'color:#000'">微信</a>, -->
      <a :style="active ? 'color:#fff' : 'color:#000'" href="https://space.bilibili.com/15768004" target="_blank">哔哩哔哩</a>or
      <a :style="active ? 'color:#fff' : 'color:#000'" href="https://weibo.com/u/2297942777" target="_blank">微博</a>.<br />
      Mail me at
      <a :style="active ? 'color:#fff' : 'color:#000'">2744046530@qq.com</a>.
      <br />Chat with the community at my Discord Server.
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    active() {
      return this.$store.state["tabActive"].active;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.home {
  position: relative;
  width: 40%;
  text-align: left;
  margin: 40px 30% 40px;
  background-color: transparent;
  padding-bottom: 30px;
}
h1 {
  font-size: 36px;
  font-weight: 700;
  margin: 20px 0;
}
.home div {
  color: #77787b;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 30px;
  margin-bottom: 30px;
  background-color: transparent;
}
.home div a {
  color: white;
  text-decoration: none;
}
.home div a:hover {
  cursor: pointer;
  text-decoration: underline;
}
p {
  font-size: 16px;
  color: #77787b;
  font-weight: 550;
  letter-spacing: 1px;
  margin-top: 35px;
}
@media screen and (max-width: 1200px) {
  .home {
    width: 70%;
    margin: 40px 15% 40px;
  }
}
@media screen and (max-width: 750px) {
  .home {
    width: 90%;
    margin: 40px 5% 40px;
  }
}
</style>
