# Chatbot
This projeect is made by **Alberto Panico**, **Angelo Nardella** and **Andrea Nigro**.  

## Install
```bash
cd chatbot
python3 -m venv venv
# linux/mac
./venv/bin/activate
# windows
./venv/Script/activate
# 
pip install torch numpy nltk

# train
python python/train.py
# execute
python python/chat.py

```

## How Does It Works?

1. ### DEFINE INTETNTS. 
We have defined our intent in intents.json, with a tag and pattern, this help us for the training of the model.

2. ### NLTK.
We use the nltk librery to work with the words (`nltk_utils.py`), in particular we use nltk to tokenize and stem the text.

3. ### TRAINING OF THE MODEL.
Now we want to train the model (`train.py`), so we import the function we had written in `nltk_utils.py`.
We use [pytorch](https://pytorch.org/)

4. ### CREATE OUR NEURAL NETWORK.
We use a feed forward nn. The input layer is fully-connected, it has the number of pattern as dimension, then we have 2 hidden layer, then we have an output layer with the number of classes. In the end we apply a softmax to get y.

5. ### CHATBOT
> NOTE: Todo

6. ### CONNECT TO THE WEBSITE
> NOTE: Todo

7. ### CREATE APP.PY
> NOTE: Todo