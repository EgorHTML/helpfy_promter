<template>
  <div class="ticket-detail__watching">
    <div class="ticket-detail__watching-users" style="color: #f56c6c">
      <span class="ticket-detail__watching-user"
        ><i class="el-icon-edit"></i> <strong>Суфлёр</strong> пишет ответ</span
      >
    </div>
  </div>
</template>

<style scoped>
.ticket-detail__watching {
  position: relative;
}

.ticket-detail__watching-users {
  z-index: 2025;
  position: absolute;
  margin: 5px 15px;
}
</style>
