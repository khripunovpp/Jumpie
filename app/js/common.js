class Jumpie {
    constructor(settings) {
        this.settings = settings
        this.sections = document.querySelectorAll(settings.sectionEl)
        this.rects = this._getRects()
        this.lastId

        this._init()
    }
    _init() {
        const that = this

        that._check.call(that)
        window.addEventListener('scroll', function(e) {
            that._check.call(that)
        })
        window.addEventListener('resize', function(e) {
            that.rects = that._getRects.call(that)
            that._check.call(that)
        })
    }
    _getRects() {
        const root = this
        let obj = {}
        root.sections.forEach(function(section) {
            obj[section.id] = root._getPostion(section)
        })
        return obj
    }
    _getPostion(el) {
        const box = el.getBoundingClientRect();
        const top = box.top + pageYOffset
        const left = box.left + pageXOffset
        return { top, left }
    }
    _check() {
        const root = this
        root.sections.forEach(function(section) {
            if (root._wasScrolled(section)) root.lastId = section.id, root._setActive()
        })
    }
    _wasScrolled(el) {
        const rect = this.rects[el.id]
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return rect.top - scrollTop - window.innerHeight + this.settings.offset < 0
    }
    _setActive() {
        const root = this
        let links = document.querySelectorAll(root.settings.itemEl + ' a')
        links.forEach(function(el) {
            if (el.hash == '#' + root.lastId) {
                el.parentElement.classList.add('active')
                root._scrollNav()
            } else {
                el.parentElement.classList.remove('active')
            }
        })
    }
    _scrollNav() {
        const root = this
        let link = document.querySelector(root.settings.itemEl + ' a[href="#' + root.lastId + '"]')
        document.querySelector(root.settings.itemContainer).scrollTo(link.parentElement.offsetLeft, 0)
    }
}

$(function() {
    const j = new Jumpie({
        sectionEl: 'section',
        itemContainer: 'nav ul',
        itemEl: 'nav ul li',
        offset: $('nav').height()
    })
});