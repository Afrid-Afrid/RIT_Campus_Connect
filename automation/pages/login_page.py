from selenium.webdriver.common.by import By
from utils.waits import wait_visible, wait_clickable
from utils.config import BASE_URL

class LoginPage:
    EMAIL_INPUT = (By.ID, "email")
    PASSWORD_INPUT = (By.ID, "password")
    LOGIN_BUTTON = (By.CSS_SELECTOR, ".login-btn")
    ERROR_MESSAGE = (By.CLASS_NAME, "error")

    def __init__(self, driver):
        self.driver = driver

    def open(self):
        self.driver.get(f"{BASE_URL}/login")

    def login(self, email, password):
        wait_visible(self.driver, self.EMAIL_INPUT).send_keys(email)
        self.driver.find_element(*self.PASSWORD_INPUT).send_keys(password)
        wait_clickable(self.driver, self.LOGIN_BUTTON).click()

    def get_error_text(self):
        return wait_visible(self.driver, self.ERROR_MESSAGE).text

    def click_register_link(self):
        self.driver.find_element(By.LINK_TEXT, "Register").click()
