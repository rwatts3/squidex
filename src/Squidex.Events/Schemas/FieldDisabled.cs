﻿// ==========================================================================
//  FieldDisabled.cs
//  Squidex Headless CMS
// ==========================================================================
//  Copyright (c) Squidex Group
//  All rights reserved.
// ==========================================================================

using Squidex.Infrastructure;
using Squidex.Infrastructure.CQRS.Events;

namespace Squidex.Events.Schemas
{
    [TypeName("FieldDisabledEvent")]
    public class FieldDisabled : IEvent
    {
        public long FieldId { get; set; }
    }
}