import store from './../redux/store/store'

export const transformFilters = () => {
    const filtersState = store.getState().search.filters;

    const filtersArray = [];

    filtersState.forEach(filter => {
        filtersArray.push(filter.value)
    })

    const filtersString = filtersArray.join();

    return filtersString;
}