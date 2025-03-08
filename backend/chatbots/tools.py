from langchain.tools import tool
import json

@tool
def save_data(action_input):
    """
    Saves lead data parsed from the given Action Input.

    Args:
        action_input (str): A string containing lead data in the format 'field1: value1, field2: value2, ...'.

    Returns:
        dict: A response indicating success or error.
    """
    try:
        data = action_input

        # Perform a mock save (in a real scenario, you would save to a database or file)
        # Example: Lead.objects.create(**data)

        return {"success": True, "message": "Data saved successfully.", "data": data}

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}

@tool
def share_cta_link(cta_link: str) -> str:
    """Shares the CTA link with the user."""
    if cta_link:
        return f"Thank you! Please follow this link to proceed: {cta_link}"
    return "No CTA link is available at the moment."
