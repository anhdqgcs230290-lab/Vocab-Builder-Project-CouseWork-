<template>
    <div>
        <h1>Show Word</h1>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="germany flag"></i> German
            </div>
            <input type="text" readonly :value="word.german" />
        </div>


        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="united kingdom flag"></i> English
            </div>
            <input type="text" readonly :value="word.english" />
        </div>


        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="vietnam flag"></i> Vietnamese
            </div>
            <input type="text" readonly :value="word.vietnamese" />
        </div>

        <div class="item">
            <i class="tag icon"></i>
            <strong>Type:</strong>
            <span :class="getPartOfSpeechClass(word.partOfSpeech)">
                {{ getPartOfSpeechLabel(word.partOfSpeech) }}
            </span>
        </div>


        <div class="actions">
            <router-link :to="{ name: 'edit', params: { id: this.$route.params.id } }">
                Edit word
            </router-link>
        </div>

    </div>
</template>

<script>
import { api } from '@/helpers/helper';

export default {
    name: 'Show',
    data() {
        return {
            word: {}
        };
    },
    async mounted() {
        this.word = await api.getWord(this.$route.params.id);
    },
    methods: {
        //  Methods giống Words.vue
        getPartOfSpeechLabel(pos) {
            const labels = {
                noun: 'Danh từ',
                verb: 'Động từ',
                adjective: 'Tính từ',
                adverb: 'Trạng từ'
            };
            return labels[pos] || pos;
        },
        getPartOfSpeechClass(pos) {
            const classes = {
                noun: 'ui blue label',
                verb: 'ui green label',
                adjective: 'ui orange label',
                adverb: 'ui purple label'
            };
            return classes[pos] || 'ui label';
        }
    }
};

</script>

<style scoped>
.actions a {
    display: block;
    text-decoration: underline;
    margin: 20px 10px;
}
</style>