<!--
@author Hyeonsooryu
-->

<template>
  <div class="section section-team text-center">
    <div class="container">
      <h2 class="title">About us</h2>
      <div class="team">
        <div class="row justify-content-center py-5">
          <div class="col-md-4">
            <div class="team-player">
              <img
                src="img/members/member2.jpg"
                alt="Thumbnail Image"
                class="rounded-circle img-fluid img-raised"
              />
              <h4 class="title">유현수</h4>
              <p class="category text-primary">Frontend, BlockChain</p>
              <a
                href="https://github.com/82surf"
                class="btn btn-primary btn-icon btn-round"
                target="_blank"
              >
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="team-player">
              <img
                src="img/members/member3.jpg"
                alt="Thumbnail Image"
                class="rounded-circle img-fluid img-raised"
              />
              <h4 class="title">이상백</h4>
              <p class="category text-primary">BlockChain, AI</p>
              <a
                href="https://github.com/tlsqktem483"
                class="btn btn-primary btn-icon btn-round"
                target="_blank"
              >
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="row py-5">
          <div class="col-md-4">
            <div class="team-player">
              <img
                src="img/members/member1.jpg"
                alt="Thumbnail Image"
                class="rounded-circle img-fluid img-raised"
              />
              <h4 class="title">김응철</h4>
              <p class="category text-primary">Backend</p>
              <a
                href="https://github.com/zbqlr456"
                class="btn btn-primary btn-icon btn-round"
                target="_blank"
              >
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="team-player">
              <img
                src="img/members/member4.jpg"
                alt="Thumbnail Image"
                class="rounded-circle img-fluid img-raised"
              />
              <h4 class="title">정은이</h4>
              <p class="category text-primary">Backend</p>
              <a
                href="https://github.com/EuneeChung"
                class="btn btn-primary btn-icon btn-round"
                target="_blank"
              >
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="team-player">
              <img
                src="img/members/member5.jpg"
                alt="Thumbnail Image"
                class="rounded-circle img-fluid img-raised"
              />
              <h4 class="title">황승연</h4>
              <p class="category text-primary">Backend, DevOps</p>
              <a
                href="https://github.com/yeon-s"
                class="btn btn-primary btn-icon btn-round"
                target="_blank"
              >
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.section-team {
  .team .team-player img {
    max-width: 100px;
  }

  .team-player {
    margin-bottom: 15px;
  }
}
</style>
