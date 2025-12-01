<template>
    <div class="ui segment statistics-container">
        <h2 class="ui header">
            <i class="chart bar icon"></i>
            Statistics
        </h2>

        <!-- ✅ SỬA: Chỉ còn 2 thống kê -->
        <div class="ui two mini statistics">
            <!-- ✅ Tổng số từ -->
            <div class="statistic">
                <div class="value">
                    <i class="book icon"></i>
                    {{ totalWords }}
                </div>
                <div class="label">Total Words</div>
            </div>

            <!-- ✅ Số ngôn ngữ -->
            <div class="statistic">
                <div class="value">
                    <i class="language icon"></i>
                    {{ totalLanguages }}
                </div>
                <div class="label">Languages</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Statistics',
    props: {
        words: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    computed: {
        // ✅ Tính tổng số từ
        totalWords() {
            return this.words.length;
        },

        // ✅ Đếm số ngôn ngữ (luôn là 3)
        totalLanguages() {
            return 3; // German, English, Vietnamese
        }
    }
};
</script>

<style scoped>
. statistics-container {
    margin-bottom: 30px;
}

/* ✅ Làm chữ nhỏ hơn */
.ui.mini.statistics . statistic>.value {
    font-size: 2rem !important;
}

.ui.mini. statistics .statistic>.label {
    font-size: 0.9rem !important;
}
</style>