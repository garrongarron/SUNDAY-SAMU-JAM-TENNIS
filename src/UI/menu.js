class Menu {
    constructor() {
        this.node = document.createElement('div')
        this.promisee = fetch('src/UI/menu.html').then(response => response.text())
        this.promisee.then(html => {
            this.node.innerHTML = html
            document.body.appendChild(this.node)
        })
    }
    start() {
        this.promisee.then(html => {
            this.node.style.display = 'block'
        })

    }
    stop() {
        this.node.style.display = 'none'
    }
}

const menu = new Menu()

export default menu

export { Menu }