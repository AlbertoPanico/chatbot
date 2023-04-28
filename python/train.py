import json
from nltk_utils import tokenize, stem, bag_of_words
import numpy as np

# r for read mode
with open('python\intents.json', 'r') as f:
    intents = json.load(f)

all_words = []
tags = []
# xy are made up by tuple, tokenize words and the tag
xy = []

# we are going to use extend instead of append because we don't want
# to have arrays of arrays, but only make our arrays bigger
for intent in intents['intents']:
    tag = intent['tag']
    tags.append(tag)
    for pattern in intent['patterns']:
        w = tokenize(pattern)
        all_words.extend(w)
        xy.append((w, tag))

ignore_words = ['?', ',', '!', '.']
all_words = [stem(w) for w in all_words if w not in ignore_words]

# we are going to remove duplicated words
all_words = sorted(set(all_words))
tags = sorted(set(tags))
print(tags)

x_train = []
y_train = []
for (pattern_sentence, tag) in xy:
    bag = bag_of_words(pattern_sentence, all_words)
    x_train.append(bag)

    label = tags.index(tag)
    # CrossEntropyLoss
    y_train.append(label)

x_train = np.array(x_train)
y_train = np.array(y_train)