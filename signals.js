export class Signal extends EventTarget {
    #value;
    get value () { return this.#value; }
    set value (value) {
        if (this.#value === value) return;
        this.#value = value;
        this.dispatchEvent(new CustomEvent('change')); 
    }

    constructor (value) {
        super();
        this.#value = value;
    }

    effect(fn) {
        const controller = new AbortController()
        const cleanup = () => controller.abort()

        fn(cleanup)
        this.addEventListener(
            'change',
            () => fn(cleanup), { signal: controller.signal }
        )

        return cleanup
    }

    valueOf () { return this.#value; }
    toString () { return String(this.#value); }
}

export class Computed extends Signal {
    constructor (fn, deps) {
        super(fn(...deps));
        for (const dep of deps) {
            if (dep instanceof Signal) 
                dep.addEventListener('change', () => this.value = fn(...deps));
        }
    }
}

export const signal = _ => new Signal(_);
export const computed = (fn, deps) => new Computed(fn, deps);
