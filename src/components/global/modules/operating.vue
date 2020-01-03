<!--
 * @Description:精致的操作组编辑删除
 * @author: <https://github.com/algesthesiahunter>
 -->
<template>
  <div class="operating">
    <span>
      <svg-icon
        class="edit"
        icon-class="group.edit"
        @click="$emit('edit')"
      ></svg-icon>
    </span>
    <PopConfirm
      :title="'确定删除 ' + name + ' ？'"
      @ConfirmSubmit="$emit('ConfirmSubmit', it._id)"
    >
      <span>
        <svg-icon
          class="delete"
          icon-class="group.delete"
          @click="$emit('delete')"
        ></svg-icon
      ></span>
    </PopConfirm>
  </div>
</template>

<script>
export default {
  props: {
    it: {},
  },
  computed: {
    name() {
      let name = null
      if (this.it.name) {
        name = this.it.name
      } else {
        name = this.it.title
      }
      return name
    },
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.operating {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: $link-color;
  cursor: pointer;
  span {
    padding: 5px 2px;
  }
  .edit {
    &:hover {
      color: $blue;
    }
  }
  .delete {
    &:hover {
      color: $red;
    }
  }
}
</style>
