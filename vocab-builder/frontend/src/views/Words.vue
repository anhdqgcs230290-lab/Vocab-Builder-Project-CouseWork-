<template>
    <div>
        <h1>Words</h1>

        <statistics :words="words"></statistics>

        <div class="ui input fluid" style="margin-bottom: 20px;">
            <input type="text" placeholder="🔍 Search words..." v-model="searchText" />
        </div>

        <!--  Nút xóa nhiều từ -->
        <div v-if="selectedIds.length > 0" style="margin-bottom: 15px;">
            <button class="ui red button" @click="deleteSelected">
                <i class="trash icon"></i>
                Delete {{ selectedIds.length }} selected word(s)
            </button>
            <button class="ui button" @click="clearSelection">
                Clear Selection
            </button>
        </div>

        <table id="words" class="ui celled compact table">
            <thead>
                <tr>
                    <!--Checkbox chọn tất cả -->
                    <th width="50">
                        <div class="ui checkbox">
                            <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll" />
                            <label></label>
                        </div>
                    </th>
                    <th>English</th>
                    <th>German</th>
                    <th>Vietnamese</th>
                    <th>Type</th>
                    <th colspan="3"></th>
                    <th colspan="3"></th>
                </tr>
            </thead>

            <tr v-for="word in filteredWords" :key="word._id">
                <!--  Checkbox cho từng từ -->
                <td>
                    <div class="ui checkbox">
                        <input type="checkbox" :value="word._id" v-model="selectedIds" />
                        <label></label>
                    </div>
                </td>
                <td>{{ word.english }}</td>
                <td>{{ word.german }}</td>
                <td>{{ word.vietnamese }}</td>

                <td>
                    <span :class="getPartOfSpeechClass(word.partOfSpeech)">
                        {{ getPartOfSpeechLabel(word.partOfSpeech) }}
                    </span>
                </td>

                <td width="75" class="center aligned">
                    <router-link :to="{ name: 'show', params: { id: word._id } }">
                        Show
                    </router-link>
                </td>

                <td width="75" class="center aligned">
                    <router-link :to="{ name: 'edit', params: { id: word._id } }">
                        Edit
                    </router-link>
                </td>

                <td width="75" class="center aligned">
                    <a href="#" @click.prevent="deleteWord(word._id)">Destroy</a>
                </td>
            </tr>
        </table>

        <p v-if="filteredWords.length === 0" style="text-align: center; color: #999; margin-top: 20px;">
            No words found for "{{ searchText }}"
        </p>
    </div>
</template>

<script>
import { api } from '../helpers/helper';
import Statistics from '../components/Statistics.vue';

export default {
    name: 'Words',
    components: {
        Statistics
    },
    data() {
        return {
            words: [],
            searchText: '',
            //  Mảng lưu ID các từ được chọn
            selectedIds: []
        };
    },
    computed: {
        filteredWords() {
            if (!this.searchText) {
                return this.words;
            }

            const search = this.searchText.toLowerCase();

            return this.words.filter(word => {
                return (
                    word.english.toLowerCase().includes(search) ||
                    word.german.toLowerCase().includes(search) ||
                    word.vietnamese.toLowerCase().includes(search)
                );
            });
        },

        //  Kiểm tra đã chọn tất cả chưa
        isAllSelected() {
            return this.filteredWords.length > 0 &&
                this.selectedIds.length === this.filteredWords.length;
        }
    },
    async mounted() {
        this.words = await api.getWords();
    },
    methods: {
        async deleteWord(id) {
            if (confirm('Are you sure you want to delete this word?')) {
                await api.deleteWord(id);
                this.words = await api.getWords();
                // : Xóa khỏi selectedIds nếu có
                this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);
            }
        },

        //  Chọn/bỏ chọn tất cả
        toggleSelectAll(event) {
            if (event.target.checked) {
                // Chọn tất cả
                this.selectedIds = this.filteredWords.map(w => w._id);
            } else {
                // Bỏ chọn tất cả
                this.selectedIds = [];
            }
        },

        //  Xóa nhiều từ cùng lúc
        async deleteSelected() {
            const count = this.selectedIds.length;
            if (!confirm(`Are you sure you want to delete ${count} word(s)?`)) {
                return;
            }

            try {
                // Xóa từng từ
                for (const id of this.selectedIds) {
                    await api.deleteWord(id);
                }

                window.vm.$toasted.success(`${count} word(s) deleted successfully!`);

                // Tải lại danh sách
                this.words = await api.getWords();
                this.selectedIds = [];
            } catch (error) {
                console.error('Delete error:', error);
                window.vm.$toasted.error('Error deleting words!');
            }
        },

        //  Xóa selection
        clearSelection() {
            this.selectedIds = [];
        },
        // Lấy nhãn phần loại từ
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