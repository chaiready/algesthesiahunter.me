<!--
 * @Description:精致的操作组编辑删除
 * @author: <https://github.com/algesthesiahunter>
 -->
<template>
  <div class="operating">
    <span>
      <svg-icon
        @click="$emit('edit')"
        class="edit"
        icon-class="group.edit"
      ></svg-icon>
    </span>
    <PopConfirm
      :title="'确定删除 ' + name + ' ？'"
      @ConfirmSubmit="$emit('ConfirmSubmit', it._id)"
    >
      <span>
        <svg-icon
          @click="$emit('delete')"
          class="delete"
          icon-class="group.delete"
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
      } else if (this.it.title) {
        name = this.it.title
      } else {
        name = this.it.content
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
