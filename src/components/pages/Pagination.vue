<template>
    <div>
        <nav class="d-flex justify-content-center" aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" :class="{'disabled' : !ps.has_pre}" href="#" aria-label="Previous" @click.prevent="getPD(ps.current_page - 1)">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item" v-for="page in ps.total_pages" :key="page" :class="{'active' : ps.current_page === page}">
                    <a class="page-link" href="#" @click.prevent="getPD(page)">{{ page }}</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next" :class="{'disabled' : !ps.has_next}" @click.prevent="getPD(ps.current_page + 1)">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data: function(){
        return{}
    },
    props: ['ps'],
    methods: {
        getPD(page) {
            this.$emit('emitproduct', page)
        }
    }
}
</script>