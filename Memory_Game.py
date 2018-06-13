from bottle import route, run, get
import bottle as b


@route('/')
def index():
    return b.template('Memory_Game.html')


@get('/js/<filename:re:.*\.js>')
def javascript(filename):
    return b.static_file(filename, root='js')


@get('/css/<filename:re:.*\.css>')
def stylesheets(filename):
    return b.static_file(filename, root='css')


@get('/images/<filename:re:.*\.(jpg|png|gif|ico)>')
def img(filename):
    return b.static_file(filename, root='images')


@get('/sound/<filename:re:.*\.mp3>')
def music(filename):
    return b.static_file(filename, root='sound')


@get('/font/<filename:re:.*\.ttf>')
def music(filename):
    return b.static_file(filename, root='font')

def main():
    run(host='localhost', port=7000)


if __name__ == '__main__':
    main()