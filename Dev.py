from textual.app import App, ComposeResult,Screen
from textual.widgets import Footer, Label, Markdown, TabbedContent, TabPane, Button, Header, TextLog,Placeholder,Input
from textual import events, on
from textual.containers import Container
import sys


class DevAPP(App):
    """An example of tabbed content."""
    
    TITLE = "开发者列表"
    BINDINGS = [
        ("ctrl+u", "show_tab('user')", "切换至User"),
        ("j", "show_tab('jessica')", "Jessica"),
        ("p", "show_tab('paul')", "Paul"),
        ("ctrl+q", "exit()", "退出"),
        ("Tab", "", "切换可操控按键"),
    ]
    DEFAULT_CSS = """
    #buttons {
        height: 3;
        width: auto;
    }
    ContentSwitcher {
        background: $panel;
        border: round $primary;
        width: 100%;
        height: 5fr;
    }
    TextLog{
    min-height: 10;
    }
    """

    def compose(self) -> ComposeResult:
        """Compose app with tabbed content."""
        # Footer to show keys
        yield Header(show_clock=1)
        yield Footer()

        # Add the TabbedContent widget
        with TabbedContent(initial="log"):
            with TabPane("用户页面", id="user"):
                yield Button("Default", id="bell")
                yield Button("Default", id="bella")
                yield Input(placeholder="First Name")
                with TabbedContent("Paul", "Alia"):
                    yield TabPane("Paul", Label("First child"),id="p")
                    yield TabPane("Alia", Label("Second child"),id="a")
            with TabPane("Paul", id="paul"):
                yield Label("666")
            with TabPane("Log", id="log"):
                yield TextLog(highlight=True, markup=True)

    def on_mount(self) -> None:
        text_log = self.query_one(TextLog)
        height=self.size.height-10
        text_log.write(height)
        text_log.write(self.size.width)
        text_log.styles.min_height=height

    def on_key(self, event: events.Key) -> None:
        """Write Key events to log."""
        text_log = self.query_one(TextLog)
        text_log.write(event)

    def action_show_tab(self, tab: str) -> None:
        """Switch to a new tab."""
        self.get_child_by_type(TabbedContent).active = tab

    def on_button_pressed(self, event: Button.Pressed) -> None:
        text_log = self.query_one(TextLog)
        # text_log.write(str(event.button))

    def action_exit(self) -> None:
        sys.exit()

    @on(events.Resize)      #监听终端大小变更事件,从而更改日志大小
    def resize_log(self):
        text_log = self.query_one(TextLog)
        height=self.size.height-10
        text_log.write(height)
        text_log.write(self.size.width)
        text_log.styles.min_height=height

    @on(Button.Pressed, "#bell")
    def write_log(self):
        """Called when the bell button is pressed."""
        text_log = self.query_one(TextLog)

        text_log.write("[bold magenta]Write text or any Rich renderable!\naaa")
        text_log.write(text_log.size)


if __name__ == "__main__":
    app = DevAPP()
    app.run()
