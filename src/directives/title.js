function showTitle(el, title) {
  const popover = getPopover()
  const popoverStyle = popover.style

  if (title === undefined) {
    popoverStyle.display = 'none'
  } else {
    const elRect = el.getBoundingClientRect()
    const elComputedStyle = window.getComputedStyle(el, null)
    const rightOffset = parseInt(elComputedStyle.getPropertyValue('padding-right')) || 0
    const topOffset = parseInt(elComputedStyle.getPropertyValue('padding-top')) || 0

    popoverStyle.visibility = 'hidden'
    popoverStyle.display = 'block'
    popover.querySelector('.popover-content').textContent = title
    popoverStyle.left = elRect.left - popover.offsetWidth / 2 + (el.offsetWidth - rightOffset) / 2 + 'px'
    popoverStyle.top = elRect.top - popover.offsetHeight + topOffset + 'px'
    popoverStyle.display = 'block'
    popoverStyle.visibility = 'visible'
  }
}
//定制弹窗样式
function getPopover(){
  let popover = document.querySelector('.title-popover')

  if (!popover) {
    const tpl = `
      <div class="popover title-popover top fade in" style="position:fixed;">
        <div class="arrow"></div>
        <div class="popover-content"></div>
      </div>
    `
    const fragment = document.createRange().createContextualFragment(tpl)

    document.body.appendChild(fragment)
    popover = document.querySelector('.title-popover')
  }

  return popover
}

export default {
  //绑定事件
  bind(el, binding, vnode) {
    const events = ['mouseenter', 'mouseleave', 'click']
    const handler = (event) => {
      //当鼠标移入的时候 弹出弹窗
      if (event.type === 'mouseenter') {
        showTitle(el, binding.value)
      } else {
        showTitle()
      }
    }
    //给上面的三个事件添加监听的行为
    events.forEach((event) => {
      el.addEventListener(event, handler, false)
    })
    //销毁监听
    el.destroy = () => {
      events.forEach((event) => {
        el.removeEventListener(event, handler, false)
      })
      el.destroy = null
    }
  },
  //释放绑定
  unbind(el) {
    el.destroy() //执行销毁
  }
}
