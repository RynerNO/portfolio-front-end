$('.pagination').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12],
    pageRange: 1,
    pageSize: 1,
    showPrevious: false,
    showNext: false
    
})
document.querySelector('.pagination-next').addEventListener('click', pagination_next, false);
function pagination_next() {
    var container = $('.pagination');
    container.pagination('next');
}