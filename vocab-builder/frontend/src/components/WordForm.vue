<template>
    <form action="#" @submit.prevent="onSubmit">
        <p v-if="errorsPresent" class="error">Please fill out all fields! </p>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="germany flag"></i> German
            </div>
            <!--sửa lại chỗ này,thay vào chỗ word.german thì dùng formData.german-->
            <input type="text" placeholder="Enter word..." v-model="formData.german" />
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="united kingdom flag"></i> English
            </div>
            <input type="text" placeholder="Enter word..." v-model="formData.english" />
        </div>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="vietnam flag"></i> Vietnamese
            </div>
            <input type="text" placeholder="Enter word..." v-model="formData.vietnamese" />
        </div>
        <div class="field">
            <label>
                <i class="tag icon"></i> Part of Speech
            </label>
            <select class="ui dropdown" v-model="formData.partOfSpeech">
                <option value="noun">Noun (Danh từ)</option>
                <option value="verb">Verb (Động từ)</option>
                <option value="adjective">Adjective (Tính từ)</option>
                <option value="adverb">Adverb (Trạng từ)</option>
            </select>
        </div>

        <button class="positive ui button">Submit</button>
    </form>
</template>

<script>
export default {
    name: 'word-form',
    props: {
        word: {
            type: Object,
            required: false
        }
    },
    data() {
        return {
            errorsPresent: false,
            formData: {
                english: '',
                german: '',
                vietnamese: ''
            }
        };
    },
    mounted() {
        // Nếu có word truyền vào, copy sang formData
        if (this.word) {
            this.formData = { ...this.word };
        }
    },
    methods: {
        onSubmit: function () {
            if (!this.formData.english || !this.formData.german || !this.formData.vietnamese) {
                this.errorsPresent = true;
            } else {
                this.errorsPresent = false;
                this.$emit('createOrUpdate', this.formData);
            }
        }
    }
};
</script>

<style scoped>
.error {
    color: red;
}

.field {
    margin-bottom: 1.5em;
}
</style>