from selenium.webdriver.common.by import By

class AttendancePage:
    TABLE_ROWS = (By.CSS_SELECTOR, "table tbody tr")

    def __init__(self, driver):
        self.driver = driver

    def get_row_count(self):
        return len(self.driver.find_elements(*self.TABLE_ROWS))
