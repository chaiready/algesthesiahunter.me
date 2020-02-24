import Vue from 'vue'
import { showMessage } from '@/utils/show-message'
import '@/plugins/swiper'
import '@/plugins/pop-confirm'
import '@/plugins/img-pop'
Vue.prototype.showMessage = showMessage
export default function({ store }) {
  store.dispatch('common/browserInit')
}
const str = `
________  ___       ________  _______   ________  _________  ___  ___  _______   ________  ___  ________
|\\   __  \\|\\  \\     |\\   ____\\|\\  ___ \\ |\\   ____\\|\\___   ___\\\\  \\|\\  \\|\\  ___ \\ |\\   ____\\|\\  \\|\\   __  \\
\\ \\  \\|\\  \\ \\  \\    \\ \\  \\___|\\ \\   __/|\\ \\  \\___|\\|___ \\  \\_\\ \\  \\\\\\  \\ \\   __/|\\ \\  \\___|\\ \\  \\ \\  \\|\\  \\
 \\ \\   __  \\ \\  \\    \\ \\  \\  __\\ \\  \\_|/_\\ \\_____  \\   \\ \\  \\ \\ \\   __  \\ \\  \\_|/_\\ \\_____  \\ \\  \\ \\   __  \\
  \\ \\  \\ \\  \\ \\  \\____\\ \\  \\|\\  \\ \\  \\_|\\ \\|____|\\  \\   \\ \\  \\ \\ \\  \\ \\  \\ \\  \\_|\\ \\|____|\\  \\ \\  \\ \\  \\ \\  \\
   \\ \\__\\ \\__\\ \\_______\\ \\_______\\ \\_______\\____\\_\\  \\   \\ \\__\\ \\ \\__\\ \\__\\ \\_______\\____\\_\\  \\ \\__\\ \\__\\ \\__\\
    \\|__|\\|__|\\|_______|\\|_______|\\|_______|\\_________\\   \\|__|  \\|__|\\|__|\\|_______|\\_________\\|__|\\|__|\\|__|
                                           \\|_________|                             \\|_________|


 ___  ___  ___  ___  ________   _________  _______   ________
|\\  \\|\\  \\|\\  \\|\\  \\|\\   ___  \\|\\___   ___\\\\  ___ \\ |\\   __  \\
\\ \\  \\\\\\  \\ \\  \\\\\\  \\ \\  \\\\ \\  \\|___ \\  \\_\\ \\   __/|\\ \\  \\|\\  \\
 \\ \\   __  \\ \\  \\\\\\  \\ \\  \\\\ \\  \\   \\ \\  \\ \\ \\  \\_|/_\\ \\   _  _\\
  \\ \\  \\ \\  \\ \\  \\\\\\  \\ \\  \\\\ \\  \\   \\ \\  \\ \\ \\  \\_|\\ \\ \\  \\\\  \\|
   \\ \\__\\ \\__\\ \\_______\\ \\__\\\\ \\__\\   \\ \\__\\ \\ \\_______\\ \\__\\\\ _\\
    \\|__|\\|__|\\|_______|\\|__| \\|__|    \\|__|  \\|_______|\\|__|\\|__|                    删繁就简三秋树，领异标新二月花。
`
console.log(`%c ${str}`, 'color:#0088f5;')
