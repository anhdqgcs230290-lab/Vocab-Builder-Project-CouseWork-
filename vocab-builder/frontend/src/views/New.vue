<template>
    <div>
        <h1>New Word</h1>
        <word-form @createOrUpdate="createOrUpdate"></word-form>
    </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helper';

export default {
    name: 'new-word',
    components: {
        'word-form': WordForm
    },
    methods: {
        async createOrUpdate(word) {
            try {
                // ✅ THÊM: Kiểm tra từ trùng
                const allWords = await api.getWords();
                const duplicate = allWords.find(w =>
                    w.english.toLowerCase() === word.english.toLowerCase() ||
                    w.german.toLowerCase() === word.german.toLowerCase() ||
                    w.vietnamese.toLowerCase() === word.vietnamese.toLowerCase()
                );

                // ✅ THÊM: Nếu trùng → cảnh báo
                if (duplicate) {
                    const confirmAdd = confirm(
                        `⚠️ Word already exists!\n\n` +
                        `English: ${duplicate.english}\n` +
                        `German: ${duplicate.german}\n` +
                        `Vietnamese: ${duplicate.vietnamese}\n\n` +
                        `Do you still want to add it?`
                    );

                    if (!confirmAdd) {
                        return; // Dừng lại, không tạo
                    }
                }

                // ✅ Tạo từ mới
                const res = await api.createWord(word);

                if (res && res._id) {
                    window.vm.$toasted.success('Word created successfully! ');
                    this.$router.push(`/words/${res._id}`);
                } else {
                    window.vm.$toasted.error('Failed to create word! ');
                }
            } catch (error) {
                console.error('Create word error:', error);
                window.vm.$toasted.error('Error creating word!');
            }
        }
    }
};
</script>