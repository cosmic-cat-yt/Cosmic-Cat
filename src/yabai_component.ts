type EventFunction = (sourceElement: Element, event: Event) => void;

class YabaiComponentException extends Error {}

/**
 * An array of all of the active event handlers.
 */
var handlers = {};

function isActiveEventName(name: string): boolean
{
    return Object.keys(handlers).includes(name);
}

function getDelegateHandler(eventName: string): (event: Event) => void
{
    return function (event: Event) {
        var activeElement: any = event.target;
        var classNameList = handlers[eventName];

        while (null != activeElement)
        {
            if (activeElement.className)
            {
                var classes;

                if (activeElement.classList)
                {
                    classes = activeElement.classList;
                }
                else
                {
                    classes = activeElement.classList.split(" ");
                }

                for (var i = 0, l = classes.length; i < l; i++)
                {
                    if (classes[i] in classNameList)
                    {
                        return classNameList[classes[i]](activeElement, event);
                    }
                }
            }

            // If there's nothing in this element, look at its parent.
            activeElement = activeElement.parentElement;
        }
    };
}

export function addHandler(eventName: string, className: string, handler: EventFunction)
{
    if (!isActiveEventName(eventName))
    {
        // Create a new event listener if there is none
        // already declared.
        document.addEventListener(
            eventName,
            getDelegateHandler(eventName)
        );
    }

    // Add the handler to the internal array.
    if ( !(eventName in handlers) )
    {
        handlers[eventName] = {};
    }

    handlers[eventName][className] = handler;
}

export function removeHandler(eventOrClassName: string, className: string = null)
{
    // 1 argument: Remove all handlers for that class name
    if (null == className)
    {
        className = eventOrClassName; // Accurate named reference
        var eventKeys = Object.keys(handlers);

        // Iterate all existing handlers to remove all class
        // names if they exist (and unbind their callbacks)
        for (var event = 0, l = eventKeys.length; event < l; event++)
        {
            var classKeys = Object.keys(handlers[event]);

            for (var handlerIndex = 0, l2 = classKeys.length; handlerIndex < l2; handlerIndex++)
            {
                if (classKeys[handlerIndex] == className)
                {
                    // Detach the handler and remove the event.
                    document.removeEventListener(classKeys[event], handlers[event][handlerIndex]);
                    delete handlers[event][handlerIndex];
                }
            }
        }
    }
    else
    {
        var eventName = eventOrClassName; // Accurate named reference

        if ( !(eventName in handlers) )
        {
            // Nothing to detach, so just return here
            return;
        }
        else
        {
            document.removeEventListener(eventName, handlers[eventName][className]);
            delete handlers[eventName][className];
        }
    }
}