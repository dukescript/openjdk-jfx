/*
 * Copyright (C) 2017 Canon Inc.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY CANON INC. AND ITS CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL CANON INC. AND ITS CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// @conditional=ENABLE(STREAMS_API)

function cancel(reason)
{
    "use strict";

    if (!@isReadableStreamBYOBReader(this))
        return @Promise.@reject(@makeThisTypeError("ReadableStreamBYOBReader", "cancel"));

    if (!this.@ownerReadableStream)
        return @Promise.@reject(new @TypeError("cancel() called on a reader owned by no readable stream"));

    return @readableStreamReaderGenericCancel(this, reason);
}

function read(view)
{
    "use strict";

    if (!@isReadableStreamBYOBReader(this))
        return @Promise.@reject(@makeThisTypeError("ReadableStreamBYOBReader", "read"));

    if (!this.@ownerReadableStream)
        return @Promise.@reject(new @TypeError("read() called on a reader owned by no readable stream"));

    if (!@isObject(view))
        return @Promise.@reject(new @TypeError("Provided view is not an object"));

    if (!@ArrayBuffer.@isView(view))
        return @Promise.@reject(new @TypeError("Provided view is not an ArrayBufferView"));

    if (view.byteLength === 0)
        return @Promise.@reject(new @TypeError("Provided view cannot have a 0 byteLength"));

    return @readableStreamBYOBReaderRead(this, view);
}

function releaseLock()
{
    "use strict";

    if (!@isReadableStreamBYOBReader(this))
        throw @makeThisTypeError("ReadableStreamBYOBReader", "releaseLock");

    if (!this.@ownerReadableStream)
        return;

    if (this.@readIntoRequests.length)
        @throwTypeError("There are still pending read requests, cannot release the lock");

    @readableStreamReaderGenericRelease(this);
}

@getter
function closed()
{
    "use strict";

    if (!@isReadableStreamBYOBReader(this))
        return @Promise.@reject(@makeGetterTypeError("ReadableStreamBYOBReader", "closed"));

    return this.@closedPromiseCapability.@promise;
}
