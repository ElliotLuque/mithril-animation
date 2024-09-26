
function Animation() {
    return {
        oncreate: ({ attrs, dom }) => {

            // Objeto style aplicar antes de la animación
            if (!attrs.beforeAnimation) return

            Object.keys(attrs.beforeAnimation).forEach(attr => {
                dom.style[attr] = attrs.beforeAnimation[attr]
            })

            createObserver(dom, attrs.afterAnimation || {})
        },

        view: ({ attrs, children }) => {
            return m("div", {
                ...attrs
            }, children)
        }
    }

    //Creacion de intersection observer para las animaciones
    function createObserver(dom, animation) {
        let observer = new IntersectionObserver(observerCallback, {});

        function observerCallback(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Object.keys(animation).forEach(attr => {
                        entry.target.style[attr] = animation[attr]
                    })

                    observer.unobserve(entry.target)
                }
            })
        }

        observer.observe(dom)
    }
}
