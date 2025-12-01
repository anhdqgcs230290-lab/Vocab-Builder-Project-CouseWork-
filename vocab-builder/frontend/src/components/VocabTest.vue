<template>
    <div>
        <h2>Score: {{ score }} out of {{ this.words.length }}</h2>

        <form action="#" @submit.prevent="onSubmit">
            <!--  Input tiếng Đức -->
            <div class="ui labeled input fluid">
                <div class="ui label">
                    <i class="germany flag"></i> German
                </div>
                <input type="text" readonly :disabled="testOver" :value="currWord.german" />
            </div>
            <!--  Input tiếng Anh -->
            <div class="ui labeled input fluid">
                <div class="ui label">
                    <i class="united kingdom flag"></i> English
                </div>
                <input type="text" placeholder="Enter English word..." v-model="english" :disabled="testOver"
                    autocomplete="off" />
            </div>
            <!--  Input tiếng Việt -->
            <div class="ui labeled input fluid">
                <div class="ui label">
                    <i class="vietnam flag"></i> Vietnamese
                </div>
                <input type="text" placeholder="Enter Vietnamese word..." v-model="vietnamese" :disabled="testOver"
                    autocomplete="off" />
            </div>

            <button class="positive ui button" :disabled="testOver">Submit</button>
        </form>

        <p :class="['results', resultClass]">
            <span v-html="result"></span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'vocab-test',
    props: {
        words: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            randWords: [... this.words.sort(() => 0.5 - Math.random())],
            incorrectGuesses: [],
            result: '',
            resultClass: '',
            english: '',
            vietnamese: '',  // THÊM input tiếng Việt
            score: 0,
            testOver: false
        };
    },
    computed: {
        currWord: function () {
            return this.randWords.length ? this.randWords[0] : '';
        }
    },
    methods: {
        onSubmit: function () {
            //  Kiểm tra cả English và Vietnamese
            const englishCorrect = this.english.toLowerCase().trim() === this.currWord.english.toLowerCase().trim();
            const vietnameseCorrect = this.vietnamese.toLowerCase().trim() === this.currWord.vietnamese.toLowerCase().trim();

            if (englishCorrect && vietnameseCorrect) {
                //  Dùng toast thay vì flash
                window.vm.$toasted.success('✅ Correct! ', { duration: 1000 });
                this.score += 1;
            } else {
                //  Hiển thị đáp án đúng
                let wrongMsg = '❌ Wrong!';
                if (!englishCorrect) wrongMsg += ` English: ${this.currWord.english}`;
                if (!vietnameseCorrect) wrongMsg += ` Vietnamese: ${this.currWord.vietnamese}`;

                window.vm.$toasted.error(wrongMsg, { duration: 2000 });
                this.incorrectGuesses.push(this.currWord.german);
            }

            //  Reset cả 2 input
            this.english = '';
            this.vietnamese = '';
            this.randWords.shift();

            if (this.randWords.length === 0) {
                this.testOver = true;
                this.displayResults();
            }
        },
        displayResults: function () {
            if (this.incorrectGuesses.length === 0) {
                this.result = ' You got everything correct.  Well done!';
                this.resultClass = 'success';
            } else {
                const incorrect = this.incorrectGuesses.join(', ');
                this.result = `<strong>You got the following words wrong:</strong> ${incorrect}`;
                this.resultClass = 'error';
            }
        }
    }
};
</script>

<style scoped>
/* */
.ui.labeled.input {
    margin-bottom: 1em;
}

.results {
    margin: 25px auto;
    padding: 15px;
    border-radius: 5px;
}

.error {
    border: 1px solid #ebccd1;
    color: #a94442;
    background-color: #f2dede;
}

.success {
    border: 1px solid #d6e9c6;
    color: #3c763d;
    background-color: #dff0d8;
}
</style>