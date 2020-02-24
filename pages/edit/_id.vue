<template>
  <div class="edit-container">
    <h3>{{ id ? '编辑文章' : '添加文章' }}</h3>
    <div class="form">
      <div>
        <span>标题</span>
        <input v-focus v-model="form.title" type="text" class="inp" />
      </div>
      <div>
        <span>分类</span>
        <select v-model="form.category">
          <option v-for="it in categorys" :key="it._id" :value="it._id">
            {{ it.name }}
          </option>
        </select>
      </div>
      <div class="w100">
        <span>标签</span>
        <div class="checkbox-box">
          <div v-for="(it, i) in tags" :key="i" class="item">
            <input
              :id="it._id"
              :value="it._id"
              v-model="form.tags"
              type="checkbox"
            />
            <label :for="it._id">{{ it.name }}</label>
          </div>
        </div>
      </div>
      <div class="w100">
        <span>来源</span>
        <select v-model="form.origin">
          <option v-for="(it, i) in origin" :key="i" :value="it">
            {{ $t(`text.origin.${it}`) }}
          </option>
        </select>
      </div>
      <div class="w100">
        <span>图片</span>
        <input v-model="form.img" type="text" class="inp w100" />
      </div>
      <div class="w100">
        <span>描述</span>
        <textarea v-model="form.des" rows="2" type="text" class="inp w100" />
      </div>
      <div class="w100">
        <span>内容</span>
        <textarea
          v-model="form.content"
          rows="25"
          type="text"
          class="inp w100"
        />
      </div>
    </div>

    <div class="footer">
      <ElButton @click="close">取 消</ElButton>
      <ElButton @click="submit" style="margin-left:8px" type="primary"
        >确 定</ElButton
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Edit',
  data() {
    return {
      form: {
        tags: [],
      },
      origin: ['original', 'reprint', 'hybrid'],
    }
  },
  computed: {
    ...mapState('category', ['categorys']),
    ...mapState('tag', ['tags']),
    id() {
      return this.$route.query.id
    },
  },
  methods: {
    ...mapActions('article', ['postArticle', 'putArticle', 'getArticleDetail']),
    add() {
      this.postArticle(this.form).then(
        () =>
          (this.form = {
            tags: [],
          })
      )
    },
    close() {
      this.$router.go(-1)
    },
    submit() {
      if (!this.id) {
        // 新增
        this.add()
        return false
      }
      this.putArticle({
        id: this.id,
        params: this.form,
      })
    },
  },
  mounted() {
    const id = this.id
    if (id) {
      this.getArticleDetail(id).then((res) => {
        this.form = {
          tags: res.tags.map((v) => v._id),
          title: res.title,
          des: res.des,
          img: res.img,
          content: res.content,
          category: res.category._id,
          origin: res.origin,
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.edit-container {
  padding: 32px;
  padding-left: 16px;
  background-color: $module-bg;
  margin-left: 92px;
  .form {
    select {
      border: 1px solid $text;
      background-color: $module-bg;
      display: inline-block;
      height: 32px;
      color: $text;
      border-radius: 2px;
      padding: 0 15px;
      margin-left: 30px;
      width: 260px;
      -webkit-appearance: none;
      -webkit-border-radius: 2px;
      outline: none;
      &:focus {
        border: 1px solid $primary;
      }
    }
    textarea {
      border: 1px solid $text;
      background-color: $module-bg;
      display: inline-block;
      color: $text;
      border-radius: 2px;
      padding: 15px;
      margin-left: 30px;
      resize: none;

      &:focus {
        border: 1px solid $primary;
      }
    }
    .checkbox-box {
      display: flex;
      flex-wrap: wrap;
      .item {
        input {
          cursor: pointer;
          width: 20px !important;
        }
        label {
          cursor: pointer;
          height: 32px;
          line-height: 32px;
        }
      }
    }
  }

  h3 {
    padding-left: 22px;
    margin-bottom: 1em;
  }
  .w100 {
    width: 100%;
  }
  .footer {
    border-top: 1px solid $module-bg;
    padding: 10px 16px;
    text-align: right;
  }
  .form {
    flex-wrap: wrap;
    span {
      text-align: right;
    }
    & > div {
      display: flex;
      margin-bottom: 16px;
    }
  }
}
</style>
