<template>
  <div class="calendar-box">
    <!-- 年份 月份 -->
    <div class="months">
      <span class="item arrow" @click="pickPre(currentYear, currentMonth)"
        >❮</span
      >
      <span class="item year-month">
        <strong class="choose-year">
          <span>{{ currentYear }}</span>
          <span>{{ isEnLang ? 'Y' : '年' }}</span>
          <span>{{ currentMonth }}</span>
          <span>{{ isEnLang ? 'M' : '月' }}</span>
          <span>{{ currentDay }}</span>
          <span>{{ isEnLang ? 'D' : '日' }}</span>
        </strong>
      </span>
      <span class="item arrow" @click="pickNext(currentYear, currentMonth)"
        >❯</span
      >
    </div>
    <!-- 星期 -->
    <ul class="weekdays" v-if="isEnLang">
      <li :key="index" v-for="(day, index) in weeksEn">{{ day }}</li>
    </ul>
    <ul class="weekdays" v-else>
      <li :key="index" v-for="(day, index) in weeksZh">{{ day }}</li>
    </ul>
    <!-- 日期 -->
    <div class="days-loading" v-if="!days.length">
      <loading-box class="loading" />
    </div>
    <ul class="days" v-else>
      <li :key="index" v-for="(day, index) in days">
        <!--本月-->
        <span v-if="day.getMonth() + 1 != currentMonth" class="other-month">{{
          day.getDate()
        }}</span>
        <span
          v-else
          class="item"
          :class="{
            active:
              day.getFullYear() == new Date().getFullYear() &&
              day.getMonth() == new Date().getMonth() &&
              day.getDate() == new Date().getDate(),
            current:
              day.getFullYear() == currentDate.getFullYear() &&
              day.getMonth() == currentDate.getMonth() &&
              day.getDate() == currentDate.getDate(),
          }"
        >
          <svg-icon
            v-if="dayHasArticle(day)"
            class="info has"
            icon-class="info"
          ></svg-icon>
          <!--today-->
          <router-link
            :to="
              `/search?date=${formatDate(
                day.getFullYear(),
                day.getMonth() + 1,
                day.getDate()
              )}`
            "
          >
            {{ day.getDate() }}
          </router-link>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'calendar',
  data() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      weeksZh: ['一', '二', '三', '四', '五', '六', '七'],
      weeksEn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      timeList: [],
      currentDate: new Date(),
    }
  },
  mounted() {
    this.initData(null)
  },
  watch: {
    date(n) {
      let res = new Date(n)
      if (res !== 'Invalid Date') {
        this.currentDate = res
      }
    },
  },
  computed: {
    isEnLang() {
      return this.$i18n.locale === 'en'
    },
    date() {
      return this.$route.query.date
    },
  },
  methods: {
    ...mapActions('article', ['getArticlesByDate']),
    dayHasArticle(day) {
      if (day.getDate() === this.currentDate.getDate()) {
        return false
      }
      let res = false
      for (let i = 0; i < this.timeList.length; i++) {
        const v = this.timeList[i]
        if (new Date(v.createdAt).getDate() === day.getDate()) {
          res = true
          break
        }
      }
      return res
    },
    initData(cur) {
      const date = cur ? new Date(cur) : new Date()
      this.currentDay = date.getDate()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.currentWeek = date.getDay()
      if (this.currentWeek == 0) {
        this.currentWeek = 7
      }
      const str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      )
      // console.log("today:" + str + "," + this.currentWeek)
      this.days.length = 0
      // 今天是周日，放在第一行第7个位置，前面6个
      for (let i = this.currentWeek - 1; i >= 0; i--) {
        const d = new Date(str)
        d.setDate(d.getDate() - i)
        // console.log("y:" + d.getDate())
        this.days.push(d)
      }
      for (let i = 1; i <= 35 - this.currentWeek; i++) {
        const d = new Date(str)
        d.setDate(d.getDate() + i)
        this.days.push(d)
      }
      const d = new Date(this.currentYear, this.currentMonth, 0)
      this.getArticlesByDate({
        startAt: `${this.currentYear}/${this.currentMonth}/1`,
        endAt: `${this.currentYear}/${this.currentMonth}/${d.getDate()}`,
      }).then(res => {
        this.timeList = res.data.map(v => {
          return {
            _id: v._id,
            createdAt: v.createdAt,
          }
        })
      })
    },
    pick(date) {
      alert(
        this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      )
    },
    pickPre(year, month) {
      //  setDate(0); 上月最后一天
      //  setDate(-1); 上月倒数第二天
      //  setDate(dx) 参数dx为 上月最后一天的前后dx天
      const d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickNext(year, month) {
      const d = new Date(this.formatDate(year, month, 1))
      d.setDate(35)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickYear(year, month) {
      alert(`${year},${month}`)
    },
    // 返回 类似 2016-01-02 格式的字符串
    formatDate(year, month, day) {
      const y = year
      let m = month
      if (m < 10) {
        m = `0${m}`
      }
      let d = day
      if (d < 10) {
        d = `0${d}`
      }
      return `${y}/${m}/${d}`
    },
  },
}
</script>

<style lang="scss" scoped>
.calendar-box {
  min-height: 238px;
  > .months {
    margin-bottom: 14px;
    padding: 0;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    .item {
      height: 28px;
      line-height: 28px;
      text-align: center;
      &.arrow {
        width: 28px;
        background-color: $module-hover-bg;
        cursor: pointer;

        &:hover {
          background-color: $module-hover-bg-darken-10;
        }
      }
    }
  }

  > .days,
  > .weekdays {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    margin-bottom: 8px;

    > li {
      display: block;
      float: left;
      width: 14.28%;
      text-align: center;
    }
  }

  > .weekdays {
    height: 28px;
    line-height: 28px;
  }

  > .days-loading {
    width: 100%;
    height: 14rem;
  }

  > .days {
    min-height: 140px;
    margin-bottom: 0;
    position: relative;

    > li {
      line-height: 35px;

      > .other-month {
        opacity: 0.3;
        cursor: initial;
      }

      > .item {
        display: block;
        border-radius: 100%;
        position: relative;
        .info {
          position: absolute;
          top: 0;
          right: 0;
          &.has {
            color: $keyword;
            opacity: 0.7;
          }
        }
        > a {
          display: block;
        }

        &:hover {
          background-color: $module-hover-bg-opacity-3;
        }
        &.active {
          background-color: $module-hover-bg;
        }
        &.current {
          background-color: $primary;
          opacity: 0.8;
          a {
            color: white;
          }
        }
      }
    }
  }
}
</style>
