export class Book {
    constructor(state) {
        this.title = state.title;
        this.summary = state.summary
        this.pages = state.pages;
        this.read = state.read;
        this.favorite = state.favorite;
    }
    print() {
        return `Book: ${this.title}`;
    }
}
