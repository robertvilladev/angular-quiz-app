""" from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import logging
import re

app = Flask(__name__)

# Set up basic logging
logging.basicConfig(level=logging.INFO)

# Load a smaller generative model (gpt2)
model_name = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Move model to the appropriate device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

@app.route('/generate-question', methods=['POST'])
def generate_question():
    logging.info("Received request to generate a question")

    data = request.get_json()
    if not data:
        logging.error("No data received")
        return jsonify({"error": "No input provided"}), 400

    # Category prompt for varied questions
    category = data.get("category", "general knowledge")  # Default to a broad category if none is provided
    prompt = (
        f"Generate a unique quiz question in the category of {category} with the following properties:\n"
        "Question: What is the capital of France?\n"
        "Correct Answer: Paris\n"
        "Incorrect Answer: London"
    )

    # Generation parameters to increase variety
    temperature = data.get("temperature", 0.6)  # Higher temperature for more randomness
    max_length = data.get("max_length", 150)

    # Tokenize input and move tensors to the appropriate device
    inputs = tokenizer(prompt, return_tensors="pt").to(device)
    logging.info("Successfully tokenized input")

    try:
        # Generate response
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_length=max_length,
                temperature=temperature,
                top_k=40,
                top_p=0.85,
                num_return_sequences=1,
                pad_token_id=tokenizer.eos_token_id
            )

        # Decode and clean up the generated text
        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        logging.info("Successfully generated text")

        # Use regex to capture structured parts
        match = re.search(
            r"Question:\s*(.*?)\s*Correct Answer:\s*(.*?)\s*Incorrect Answer:\s*(.*)",
            generated_text,
            re.DOTALL
        )
        if match:
            question, correct_answer, incorrect_answer = match.groups()
            return jsonify({
                "question": question.strip(),
                "correct_answer": correct_answer.strip(),
                "incorrect_answer": incorrect_answer.strip()
            })
        else:
            logging.warning("Generated text did not match expected format")
            return jsonify({"question": "Could not generate a quiz question in the expected format. Please try again."})

    except Exception as e:
        logging.error(f"Error during model inference: {str(e)}")
        return jsonify({"error": "Model inference failed"}), 500

if __name__ == '__main__':
    app.run(port=5000)
 """
