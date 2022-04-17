<template>
  <!-- 关于我们 -->
  <div class="about">
    <div class="about-top">
      <MainTop>关于我们 </MainTop>
    </div>
    <div class="about-bottom padding15">
      <div class="bottom-top">
        <h1>河北工业遗产保护开发系统</h1>
        <p>用科技让遗产焕发新生</p>
        <!-- <p>
          河北省是我国近现代早期工业发展的重要发祥地和聚集区之一，工业遗产繁多，工业文化资陈丰富。做好工业文化资源汇编，全面掌握河北省工业文化资源基本情况，挖掘和提炼河北省优秀工业文化，有利于发掘、保护和合理利用工业文化资源，为加强河北特色工业文化建设，做好工业文化资源保护和开发利用工作奠定基础。
        </p>
        <p>
          河北省工业遗产保护开发系统包括遗产展示、旅行决策、数据维护、遗产报修等多项内容。力求全面汇总、整理、提炼河北工业文化资源，做到内容全面、信息丰富、数据翔实、决策科学，为河北工业文化发展提供思路借鉴和帮助。
        </p> -->
        <p>
          本系统为个人独立开发，难免有问题和不足之处，希望您多提宝贵意见，您的反馈将推动系统的更新，在此表示感谢。
        </p>
      </div>
      <el-divider></el-divider>
      <div class="bottom-top">
        <h2>详尽的遗产数据库</h2>
        <p>
          建立详细的工业遗产地理空间数据库，以图文记录每一个遗产情况，目前已收录河北上百工业遗产
        </p>
        <br />
        <br />
        <div class="che-box">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover" class="el-card">
                <span class="littleTitle">全面</span>
                <br />

                <span class="littleMain"
                  >建立河北省工业遗产数据库，收录100+个工业遗产及相关产业。定期维护，实时更新</span
                >
                <div class="cheImg">
                  <div class="cheImg-left1"></div>
                  <div class="cheImg-right">
                    <img
                      src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/8de75733-4020-4ef8-8bef-d2d5507f9736.png"
                      alt=""
                    />
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <span class="littleTitle">精确</span>
                <br />

                <span class="littleMain"
                  >依据客户端实时定位用户位置，为用户出行提供精确的定制化决策,随时随地，想走就走</span
                >
                <div class="cheImg">
                  <div class="cheImg-left2"></div>
                  <div class="cheImg-right">
                    <img
                      src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/3d601a03-dba4-4f22-bba5-643b5c332e59.png"
                      alt=""
                    />
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <span class="littleTitle">可视化</span>
                <br />

                <span class="littleMain"
                  >工业遗产数据可视化处理，热力值、蜂窝图、多种图表的形式展示。海量数据，跃然纸上</span
                >
                <div class="cheImg">
                  <div class="cheImg-left3"></div>
                  <div class="cheImg-right">
                    <img
                      src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/08b2e3ee-83af-46e1-9736-ba7af8bd1675.png"
                      alt=""
                    />
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="bottom-top">
        <h2>丰富的系统功能</h2>
        <div class="fenfu">
          <div class="bottom-fenfu-right">
            <img
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/c2854931-6176-4c67-bb83-1cd3aa775085.png"
              alt=""
            />
          </div>
          <div class="bottom-fenfu-left">
            <div class="inner">
              <p>
                河北省是我国近现代早期工业发展的重要发祥地和聚集区之一，工业遗产繁多，工业文化资陈丰富。做好工业文化资源汇编，全面掌握河北省工业文化资源基本情况，挖掘和提炼河北省优秀工业文化，有利于发掘、保护和合理利用工业文化资源，为加强河北特色工业文化建设，做好工业文化资源保护和开发利用工作奠定基础。
              </p>
              <p>
                河北省工业遗产保护开发系统包括遗产展示、旅行决策、数据维护、遗产报修等多项内容。力求全面汇总、整理、提炼河北工业文化资源，做到内容全面、信息丰富、数据翔实、决策科学，为河北工业文化发展提供思路借鉴和帮助。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="outer" style="padding: 15px">
        <div class="bigImg">
          <img
            class="bimgurl"
            src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/05c9c3ad-bfcd-4cbd-9703-3f65db8a7e98.jpg"
            alt=""
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div class="about-bottom">
        <div class="about-bottom-inner">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="always">
                <img
                  src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/9b7026f8-a7ee-48b4-b79e-c4fe44c2f565.png"
                  alt=""
                />
                <p>地图</p>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="always">
                <img
                  src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/c9d924c5-c83f-4eb7-ac3b-08a78cb2490b.png"
                  alt=""
                />
                <p>数据</p>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="always">
                <img
                  src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/c05efd14-d545-4064-a625-9dff24672653.png"
                  alt=""
                />
                <p>决策</p>
              </el-card>
            </el-col>
          </el-row>

          <el-button
            style="width: 25%; margin-top: 25px; margin-bottom: 25px"
            @click="getMore"
            >了解更多</el-button
          >
        </div>
      </div>
      <el-divider></el-divider>

      <div class="about-install">
        <div class="png">
          <div class="png-che">
            <img
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/cfaefb6d-0f9c-48c0-8b11-fc0834594ef6.png"
              alt=""
            />
          </div>
          <div class="png-p">
            <p>
              为应对不通的业务需求，提高系统运行效率。本系统还提供了桌面应用程序的下载安装包。目前版本支持Windows系统64位及32位操作系统，目前有精简绿色包版以及安装包版两种下载方式，请依据自己实际需求下载使用。
            </p>
            <!-- <img
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-790d5b85-9674-4a89-9bcc-c0657ea369be/26afc341-0280-4965-bb7e-1e8fe787111d.png"
              alt=""
            /> -->
          </div>
        </div>

        <div class="install-a">
          <div class="a-che">
            <p>Windows版64位</p>
            <span class="span">安装包版 1.0.0.0</span>

            <br />
            <el-button
              style="width: 95px; margin-top: 10px"
              type="primary"
              @click="
                goInstall(
                  'https://pan.baidu.com/s/1iI-r7qZMpxCv2laVzriQyA?pwd=wi64'
                )
              "
              >下载</el-button
            >
          </div>
          <div class="a-che">
            <p>Windows版64位</p>
            <span class="span">精简绿色包版 1.0.0.0</span>

            <br />
            <el-button
              style="width: 95px; margin-top: 10px"
              type="primary"
              @click="
                goInstall(
                  'https://pan.baidu.com/s/1de9x5y-G6wGnErh4Pe7m2w?pwd=wi64'
                )
              "
              >下载</el-button
            >
          </div>
          <div class="a-che">
            <p>Windows版32位</p>
            <span class="span">安装包版 1.0.0.0</span>

            <br />
            <el-button
              style="width: 95px; margin-top: 10px"
              type="primary"
              @click="
                goInstall(
                  'https://pan.baidu.com/s/1J5sg7MAnGyLvBOD74iYaKA?pwd=wi32'
                )
              "
              >下载</el-button
            >
          </div>
          <div class="a-che">
            <p>Windows版32位</p>
            <span class="span">精简绿色包版 1.0.0.0</span>

            <br />
            <el-button
              style="width: 95px; margin-top: 10px"
              type="primary"
              @click="
                goInstall(
                  'https://pan.baidu.com/s/1XKa7faMlzZGz1I5htHw2RQ?pwd=wi32'
                )
              "
              >下载</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainTop from "../components/MainTop.vue";
export default {
  components: {
    MainTop,
  },

  data() {
    return {};
  },

  methods: {
    /*     test() {
      console.log(1);
    }, */
    getMore() {
      this.$router.push("/");
    },
    goInstall(path) {
      window.open(path);
    },
  },
};
</script>

<style>
.about .bottom-top {
  text-align: center;

  /* background-color: #f8fafa; */
}
.about .bottom-top p {
  margin: 0;
  color: #7c7a7a;
  padding-bottom: 15px;
}

.about h2 {
  font-weight: 400;
}
.about .littleTitle {
  color: black;

  font-size: 16px;
}
.about .che-box {
  text-align: left;
}
.about .littleMain {
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  padding-top: 10px;
  display: block;
}
.about .cheImg {
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
}
.about .cheImg .cheImg-left1 {
  margin-top: 25px;
  width: 20px;
  height: 2px;
  background-color: rgb(37, 108, 237);
}
.about .cheImg .cheImg-left2 {
  margin-top: 25px;
  width: 20px;
  height: 2px;
  background-color: rgb(25, 178, 119);
}
.about .cheImg .cheImg-left3 {
  margin-top: 25px;
  width: 20px;
  height: 2px;
  background-color: rgb(243, 162, 30);
}
.about .cheImg img {
  width: 150px;
  height: 150px;
}
.about .el-card {
  min-height: 310px;
}

.bigImg {
  width: 100%;
  height: 411px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.bigImg .bimgurl {
  width: 100%;
  height: auto;
  transition-duration: 1s;
}
.bigImg .bimgurl:hover {
  width: 120%;
  height: auto;
}
.about .fenfu {
  display: flex;
  justify-content: space-between;
}
.about .bottom-fenfu-left {
  width: 60%;
  text-align: left;
  display: flex;
  height: 490px;
  align-items: center;
}
.about .bottom-fenfu-left .inner {
  margin-top: -80px;
  text-indent: 2em;
  padding-right: 15%;
  padding-left: 25%;
}
.about .bottom-fenfu-right {
  width: 40%;
}
.about .bottom-fenfu-right img {
  width: 490px;
  height: auto;
}

.about .about-bottom .about-bottom-inner {
  width: 70%;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 30px;
}

.about .about-bottom .about-bottom-inner img {
  width: 50%;
  height: auto;
}

.about .about-bottom .about-bottom-inner p {
  margin: 0;
  font-weight: 600;
}
.about .about-bottom .about-bottom-inner .el-card {
  min-height: 0;
}

/* 安装包部分样式 */
.about-install {
  padding-bottom: 50px;
}
.about-install .png {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
}
.about-install .png .png-che {
  text-align: center;
  padding-right: 200px;
}
.about-install .png .png-p {
  width: 35%;
  font-size: 18px;
  text-indent: 2em;
  line-height: 30px;
}
.about-install .install-a {
  padding-top: 60px;
  display: flex;
  justify-content: center;
}
.about-install .install-a .a-che {
  padding: 0 40px;
  text-align: center;
  line-height: 28px;
}
.about-install .install-a .a-che p {
  margin: 0;
  font-size: 20px;
}
.about-install .install-a .a-che .span {
  font-size: 18px;
  color: #333;
}
.about-install .install-a .a-che .spanmini {
  font-size: 14px;
  color: #333;
  line-height: 15px;
}
</style>
