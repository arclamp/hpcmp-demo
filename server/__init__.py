from girder.api.rest import Resource


class HPCMP(Resource):
    def __init__(self):
        super(HPCMP, self).__init__();
        self.resourceName = 'hpcmp'

        self.route('POST', ('stream', ':id'), self.open_stream)
        self.route('POST', ('stream', ':id', 'read'), self.read_stream)
        self.route('DELETE', ('stream', ':id'), self.close_stream)

    @access.public(TokenScope.DATA_READ)
    @loadmodel(model='file', level=AccessType.READ)
    @describeRoute(
        Description('Open a new stream for reading')
        .param('id', 'The File ID', paramType='path')
        .errorResponse('Read access was denied on this journal.', 403)
    )
    self.open_stream(file):
        return file

    @access.public(TokenScope.DATA_READ)
    @loadmodel(model='file', level=AccessType.READ)
    @describeRoute(
        Description('Open a new stream for reading')
        .param('id', 'The stream ID')
        .errorResponse('Read access was denied on this journal.', 403)
    )
    self.read_stream(id):
        return id

    @access.public(TokenScope.DATA_READ)
    @loadmodel(model='file', level=AccessType.READ)
    @describeRoute(
        Description('Open a new stream for reading')
        .param('id', 'The stream ID')
        .errorResponse('Read access was denied on this journal.', 403)
    )
    self.close_stream(id):
        return id


def load(info):
    info['apiRoot'].hpcmp = HPCMP()
