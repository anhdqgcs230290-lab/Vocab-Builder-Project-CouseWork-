<template>
    <div>
        <h1>Edit Word</h1>
        <!--  dòng này để hiển thị form khi dữ liệu đã được load -->
        <word-form v-if="word._id" :word="word" @createOrUpdate="createOrUpdateWord"></word-form>
        <p v-else>Loading...</p>
    </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helper';

export default {
    name: 'edit',
    components: {
        'word-form': WordForm
    },
    data() {
        return {
            //  Khởi tạo với cấu trúc đầy đủ
            word: {
                english: '',
                german: '',
                vietnamese: '',
                partOfSpeech: 'noun'
            }
        };
    },
    async mounted() {
        //  Load dữ liệu
        const id = this.$route.params.id;
        this.word = await api.getWord(id);
    },
    methods: {
        async createOrUpdateWord(word) {
            try {
                const id = this.$route.params.id;
                await api.updateWord(id, word);

                window.vm.$toasted.success('Word updated successfully!');
                this.$router.push(`/words/${id}`);
            } catch (error) {
                console.error('Update error:', error);
                window.vm.$toasted.error('Error updating word!');
            }
        }
    }
};
</script>